import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Salt, parseSalt } from "../src/auth/password.service";

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }

  const salt = parseSalt(BCRYPT_SALT);

  seed(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
async function seed(bcryptSalt: Salt) {
  console.info("Seeding database...");

  const client = new PrismaClient();

  const queryEnableRowSecurity =
    'alter table public."User" enable row level security';
  await client.$queryRawUnsafe(queryEnableRowSecurity);

  const queryPolicySelect =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'Public users are viewable by everyone.') THEN " +
    'create policy "Public users are viewable by everyone." on public."User" for select using ( true );' +
    "END IF; " +
    "END " +
    "$do$; ";
  await client.$queryRawUnsafe(queryPolicySelect);

  const queryPolicyInsert =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'Users can insert their own users.') THEN " +
    'create policy "Users can insert their own users." on public."User" for insert with check ( auth.uid()::text = id );' +
    "END IF; " +
    "END " +
    "$do$; ";
  await client.$queryRawUnsafe(queryPolicyInsert);

  const queryPolicyupdate =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'Users can update own users.') THEN " +
    'create policy "Users can update own users." on public."User" for update using ( auth.uid()::text = id );' +
    "END IF; " +
    "END " +
    "$do$; ";
  await client.$queryRawUnsafe(queryPolicyupdate);

  const queryPolicySelectId =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'Users are viewable by users who created them.') THEN " +
    'create policy "Users are viewable by users who created them." on public."User" for select using ( auth.uid()::text = id );' +
    "END IF; " +
    "END " +
    "$do$; ";
  await client.$queryRawUnsafe(queryPolicySelectId);

  // create function that insert new row into  public.User
  const queryFunctionAddUser =
    "create or replace function public.handle_new_user() " +
    "returns trigger " +
    "language plpgsql " +
    "security definer set search_path = public " +
    "as $$ " +
    "begin " +
    'insert into public."User" (id,"createdAt","updatedAt",username,password,roles) ' +
    "values (new.id::text,new.created_at,new.updated_at,new.email,new.encrypted_password, ARRAY[new.role]) " +
    "ON CONFLICT (id) " +
    "DO " +
    'UPDATE SET "createdAt" = new.created_at,"updatedAt" = new.updated_at,username = new.email, ' +
    "password = new.encrypted_password,roles = ARRAY[new.role]; " +
    "return new; " +
    "end; " +
    "$$; ";
  await client.$queryRawUnsafe(queryFunctionAddUser);

  // create function that delete user when delete row from auth.user
  const queryFunctionDeleteUser =
    "create or replace function public.handle_delete_user() " +
    "returns trigger " +
    "language plpgsql " +
    "security definer set search_path = public " +
    "as $$ " +
    "begin " +
    'delete from public."User" where id = old.id::text; ' +
    "return old; " +
    "end; " +
    "$$; ";
  await client.$queryRawUnsafe(queryFunctionDeleteUser);

  const queryTriggerAddUser =
    "create or replace trigger on_auth_user_created " +
    "after insert or update on auth.users " +
    "for each row execute procedure public.handle_new_user() ";

  await client.$queryRawUnsafe(queryTriggerAddUser);

  const queryTriggerDeleteUser =
    "create or replace trigger on_auth_user_deleted " +
    "after delete on auth.users " +
    "for each row execute procedure public.handle_delete_user() ";

  await client.$queryRawUnsafe(queryTriggerDeleteUser);

  const createUser =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_user " +
    "WHERE  usename = 'user_postgres')Then " +
    "CREATE USER user_postgres WITH LOGIN PASSWORD 'user_postgres'; " +
    "END IF; " +
    "END " +
    "$do$; ";

  await client.$queryRawUnsafe(createUser);
  await client.$queryRawUnsafe(
    "alter user user_postgres with createdb createrole replication"
  );
  await client.$queryRawUnsafe(
    "GRANT ALL PRIVILEGES ON DATABASE postgres to user_postgres"
  );
  await client.$queryRawUnsafe("GRANT USAGE ON SCHEMA public TO user_postgres");
  await client.$queryRawUnsafe(
    "GRANT ALL PRIVILEGES ON SCHEMA public TO user_postgres"
  );
  await client.$queryRawUnsafe(
    "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_postgres"
  );
  await client.$queryRawUnsafe(
    "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_postgres"
  );

  const createRole =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_roles " +
    "WHERE  rolname = 'user')Then " +
    'create role "user" login noinherit;' +
    "END IF; " +
    "END " +
    "$do$; ";

  await client.$queryRawUnsafe(createRole);
  await client.$queryRawUnsafe('grant "user" to authenticator');
  await client.$queryRawUnsafe('GRANT USAGE ON SCHEMA public TO "user"');
  await client.$queryRawUnsafe(
    'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "user"'
  );

  //----------------- Candidate role  ------------------------
  //   const createCandidateRole =
  //   "DO " +
  //   "$do$ " +
  //   "BEGIN " +
  //   "IF NOT EXISTS ( " +
  //   "SELECT FROM pg_catalog.pg_roles " +
  //   "WHERE  rolname = 'candidate_role')Then " +
  //   'create role "candidate_role" login noinherit;' +
  //   "END IF; " +
  //   "END " +
  //   "$do$; ";

  // await client.$queryRawUnsafe(createCandidateRole);
  // await client.$queryRawUnsafe('grant "candidate_role" to authenticator');
  // await client.$queryRawUnsafe('GRANT USAGE ON SCHEMA public TO "candidate_role"');
  // await client.$queryRawUnsafe(
  //   'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "candidate_role"'
  // );
  // //----------------- Admin role  ------------------------
  // const createAdminRole =
  // "DO " +
  // "$do$ " +
  // "BEGIN " +
  // "IF NOT EXISTS ( " +
  // "SELECT FROM pg_catalog.pg_roles " +
  // "WHERE  rolname = 'admin')Then " +
  // 'create role "admin"  login noinherit;' +
  // "END IF; " +
  // "END " +
  // "$do$; ";
  // await client.$queryRawUnsafe(createAdminRole);
  // await client.$queryRawUnsafe('grant "admin" to authenticator');
  // await client.$queryRawUnsafe('GRANT USAGE ON SCHEMA public TO "admin"');
  // await client.$queryRawUnsafe(
  // 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "admin"'
  // );

  // //----------------- Recruiter role  ------------------------
  // const createRecruiterRole =
  // "DO " +
  // "$do$ " +
  // "BEGIN " +
  // "IF NOT EXISTS ( " +
  // "SELECT FROM pg_catalog.pg_roles " +
  // "WHERE  rolname = 'recruiter_role')Then " +
  // 'create role "recruiter_role" login noinherit;' +
  // "END IF; " +
  // "END " +
  // "$do$; ";
  // await client.$queryRawUnsafe(createRecruiterRole);
  // await client.$queryRawUnsafe('grant "recruiter_role" to authenticator');
  // await client.$queryRawUnsafe('GRANT USAGE ON SCHEMA public TO "recruiter_role"');
  // await client.$queryRawUnsafe(
  // 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "recruiter_role"'
  // );

  /* const setEntityUserColumn =
    "DO $$ " +
    "DECLARE " +
    "t_name VARCHAR; " +
    "c_name VARCHAR; " +
    "v_cnt int; " +
    "c1 CURSOR is ( " +
    "SELECT " +
    "tc.table_name, " +
    "kcu.column_name " +
    "FROM " +
    "information_schema.table_constraints AS tc " +
    "JOIN information_schema.key_column_usage AS kcu " +
    "ON tc.constraint_name = kcu.constraint_name " +
    "AND tc.table_schema = kcu.table_schema " +
    "JOIN information_schema.constraint_column_usage AS ccu " +
    "ON ccu.constraint_name = tc.constraint_name " +
    "AND ccu.table_schema = tc.table_schema " +
    "WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name='User' AND ccu.table_schema ='public'); " +
    "BEGIN " +
    "OPEN c1; " +
    "LOOP " +
    "FETCH c1 INTO t_name,c_name; " +
    "EXIT when NOT FOUND; " +
    'EXECUTE format(\'ALTER TABLE "public"."%1$s" DISABLE ROW LEVEL SECURITY\',t_name); ' +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'tenant_isolation_policy' and tablename = t_name ) THEN " +
    'EXECUTE format(\'CREATE POLICY tenant_isolation_policy ON "public"."%1$s" USING ("%2$s" = requesting_user_id())\',t_name,c_name); ' +
    "END IF; " +
    'EXECUTE format(\'ALTER TABLE "public"."%1$s" ALTER COLUMN "%2$s" SET DEFAULT requesting_user_id()\',t_name,c_name); ' +
    'EXECUTE format(\'ALTER TABLE "public"."%1$s" ENABLE ROW LEVEL SECURITY\',t_name); ' +
    "END LOOP; " +
    "CLOSE c1; " +
    "END $$; ";

  await client.$queryRawUnsafe(setEntityUserColumn);*/

  client.$disconnect();

  const createReqUserRoleFunction =
    "create or replace function requesting_user_role() " +
    "returns text " +
    "language sql stable " +
    "as $$ " +
    "select nullif(current_setting('request.jwt.claims', true)::json->>'role', '')::text; " +
    "$$;";
  await client.$queryRawUnsafe(createReqUserRoleFunction)

  //######################subscribers number function###########################################
  const createReqUserSubscribersNumbers =
    "create or replace function subsNumber()" +
    "returns text " +
    "language sql stable " +
    "as $$ " +
    'SELECT count(*) FROM "FollowEntreprise" WHERE "FollowEntreprise"."entrepriseId" = current_entreprise_id();' +
    "$$;";
  await client.$queryRawUnsafe(createReqUserSubscribersNumbers);
  //############################## stats for board table #############################
  const statesBoardTableView = `
  create or replace view "statesBoardTableView" as 
  SELECT count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'like'::text) AS likes,
  count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'share'::text) AS shares,
     subsNumber() AS subscribers,
     "Entreprise".id AS entrepriseid,
     "Entreprise".name AS entreprisename,
     "User".id AS userid
    FROM "Socialinterraction",
     "Publication",
     "User",
     "Recruiter",
     "Post",
     "Entreprise"
    WHERE "Socialinterraction"."userId" = requesting_user_id()
	AND "Socialinterraction"."publicationId" = "Publication".id 
	AND "Publication".id = "Post"."publicationId" 
	AND "Socialinterraction"."publicationId" = "Publication".id 
	AND "User".id = "Publication"."userId" 
	AND "Publication".type = 'post'::"EnumTypePub" 
	AND "Publication"."postId" = "Post".id 
	AND "Entreprise".id = "Post"."entrepriseId" 
	AND "Socialinterraction"."publicationId" = "Publication".id
	AND "User"."recruiterId" = "Recruiter"."id"
  AND "Entreprise"."id" = current_entreprise_id()
  OR requesting_user_role() = 'admin'::text
  GROUP BY "Entreprise".id, "User".id;`;
  await client.$queryRawUnsafe(statesBoardTableView);


  //###########################################################
  const audienceList = `
  CREATE OR REPLACE VIEW "audienceList" AS 
  SELECT 
    "User".id as "userId",
    "User"."firstName",
    "User"."lastName",
    "User".username,
    "User".roles,
    "User".email,
    "User".phone,
    "User".address,
    "User".photo,
    cc."wantedPost",
    cc."personalCv",
    cc."mediaLink",
    cc."tags",
    count(
        CASE
            WHEN e.type = 'like' THEN 1
            ELSE NULL
        END) AS like,
  
    count(
        CASE
            WHEN e.type = 'vue' THEN 1
            ELSE NULL
        END) AS view,
  
    count(
        CASE
            WHEN e.type = 'share' THEN 1
            ELSE NULL
        END) AS share,
  
    count( CASE
            WHEN e.type = 'comment' THEN 1
            ELSE NULL
        END ) AS comment,
        SUM(count(CASE WHEN e.type = 'comment' THEN 1 ELSE NULL END )+ 
            count(CASE WHEN e.type = 'like' THEN 1 ELSE NULL END ) +
            count(CASE WHEN e.type = 'share' THEN 1 ELSE NULL END ) +
            count(CASE WHEN e.type = 'vue' THEN 1 ELSE NULL END ))
            OVER (PARTITION BY "User".id) AS total_interactions
    FROM public."User"
    left join "Socialinterraction" e on "User".id = e."userId" 
    left join "Candidate" cc on cc."userId" = "User".id
    left join "FollowEntreprise" f on f."candidateId" = cc.id 
    WHERE  current_entreprise_id()   = f."entrepriseId"
    GROUP BY public."User".id, cc."wantedPost", cc."personalCv", cc."mediaLink",cc."tags";`;

  await client.$queryRawUnsafe(audienceList);

  const userList = `
  CREATE OR REPLACE VIEW "userList" AS 
  SELECT 
    "User".id as "userId",
    "User"."firstName",
    "User"."lastName",
    "User".username,
    "User".roles,
    "User".email,
    "User".phone,
    "User".address,
    "User".photo,
    cc."wantedPost",
    cc."personalCv",
    cc."mediaLink",
    cc."tags",
    count(
        CASE
            WHEN e.type = 'like' THEN 1
            ELSE NULL
        END) AS like,
  
    count(
        CASE
            WHEN e.type = 'vue' THEN 1
            ELSE NULL
        END) AS view,
  
    count(
        CASE
            WHEN e.type = 'share' THEN 1
            ELSE NULL
        END) AS share,
  
    count( CASE
            WHEN e.type = 'comment' THEN 1
            ELSE NULL
        END ) AS comment,
        SUM(count(CASE WHEN e.type = 'comment' THEN 1 ELSE NULL END )+ 
            count(CASE WHEN e.type = 'like' THEN 1 ELSE NULL END ) +
            count(CASE WHEN e.type = 'share' THEN 1 ELSE NULL END ) +
            count(CASE WHEN e.type = 'vue' THEN 1 ELSE NULL END ))
            OVER (PARTITION BY "User".id) AS total_interactions
    FROM public."User"
    left join "Socialinterraction" e on "User".id = e."userId"
    left join "Candidate" cc on cc."userId" = "User".id
    left join "Publication" p on p.id = e."publicationId"
    where requesting_user_id() = p."userId" and cc."userId" = "User".id
    GROUP BY public."User".id, cc."wantedPost", cc."personalCv", cc."mediaLink",cc."tags";`;

  await client.$queryRawUnsafe(userList);


  //######################Story Policy#######################

  //   const tenant_isolation_policy =
  //   "DO " +
  //   "$do$ " +
  //   "BEGIN " +
  //   "IF NOT EXISTS ( " +
  //   "SELECT FROM pg_catalog.pg_policies " +
  //   "WHERE  policyname = 'tenant_isolation_policy' and tablename = t_name) THEN " +
  //   'EXECUTE format(\'CREATE POLICY tenant_isolation_policy ON "public"."%1$s"  USING ("%2$s" = requesting_user_id() or requesting_user_role()=\'\'admin\'\')\',t_name,c_name); '+
  //   "END IF; " +
  //   "END " +
  //   "$do$; ";
  // await client.$queryRawUnsafe(tenant_isolation_policy);
  //############################################

  //######################function###########################################
  ;

  //###############################query seedin the posts view to supabase###########################
  const PostsData = `
  create or replace view "PostsView"  as 
  SELECT count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'vue'::text) AS views,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'like'::text) AS likes,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'comment'::text) AS comments,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'share'::text) AS shares,
   pub.title,
  pub.description,
  pub."createdAt",
  pub."deletedAt",
  post.image,
  post.id AS postid,
  entreprise.id AS entrepriseid,
  user_table.id AS userid,
  socialinterraction."createdAt" AS "dateInteraction"
 FROM "Publication" pub
   LEFT JOIN "Socialinterraction" socialinterraction ON socialinterraction."publicationId" = pub.id
   LEFT JOIN "User" user_table ON pub."userId" = user_table.id
   LEFT JOIN "Post" post ON pub.id = post."publicationId"
   LEFT JOIN "Recruiter" recruiter ON recruiter."userId" = user_table.id
   LEFT JOIN "Entreprise" entreprise ON entreprise.id = recruiter."entrepriseId"
WHERE pub.type = 'post'::"EnumTypePub" AND entreprise.id = current_entreprise_id() AND pub.id = post."publicationId"  OR requesting_user_role() = 'admin'::text
GROUP BY pub.title, pub.description, post.image, entreprise.id, user_table.id, pub."createdAt", pub."deletedAt", post.id, socialinterraction."createdAt";`;
  await client.$queryRawUnsafe(PostsData);


  //####################query seeding the stories to supabase#####################
  const queryCreateStoriesView = `
  create or replace view "Storiesview" as 
  SELECT count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'vue'::text) AS views,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'like'::text) AS likes,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'comment'::text) AS comments,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'share'::text) AS shares,
  pub.title,
  pub.description,
  recruiter."entrepriseId" AS entrepriseid,
  pub."userId" AS userid,
  pub.id AS "publicationId",
  pub."deletedAt" AS "deletedAt",
  pub."createdAt" AS "createdAt",
  story."mediaLink" AS "mediaLink",
  socialinterraction."createdAt" AS "dateInteraction"
 FROM "Publication" pub
Left Join "Socialinterraction" socialinterraction ON ( socialinterraction."publicationId" = pub.id )
Left Join "User" user_table ON ( pub."userId" = user_table.id )
Left Join "Story" story ON ( pub.id = story."publicationId" )
Left Join "Recruiter" recruiter ON ( recruiter."userId" = user_table.id )
Left Join "Entreprise" entreprise ON ( entreprise.id = recruiter."entrepriseId" )
WHERE pub.type = 'story'::"EnumTypePub" and entreprise.id = current_entreprise_id() AND pub.id = story."publicationId"
group by pub.title, pub.description, recruiter."entrepriseId", pub."userId", pub.id, pub."deletedAt", pub."createdAt", story."mediaLink", 
socialinterraction."createdAt"; `;
  await client.$queryRawUnsafe(queryCreateStoriesView);


  //#####################query seeding the events to supabase######################
  const queryCreateEventsView = `
  create or replace view "Eventsview" as 
  SELECT count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'vue'::text) AS views,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'like'::text) AS likes,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'comment'::text) AS comments,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'share'::text) AS shares,
  pub.title,
  pub.description,
  user_table.id AS userid,
  event.location,
  event.file,
  event."startDate",
  event.id,
  event."endDate",
  event."link",
  event."speakers",
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'attend'::text) AS attendees,
  event."createdAt",
  event."deletedAt",
  entreprise.id AS "entrepriseId",
  ( SELECT DISTINCT "Socialinterraction_1".id
  FROM "Socialinterraction" "Socialinterraction_1"
 WHERE pub.id = "Socialinterraction_1"."publicationId" AND "Socialinterraction_1".type = 'attend'::text AND "Socialinterraction_1"."userId" = requesting_user_id()) AS "attended",
  pub.id as "publicationId"
  FROM "Publication" pub
Left Join "Socialinterraction" socialinterraction ON ( socialinterraction."publicationId" = pub.id )
Left Join "User" user_table ON ( pub."userId" = user_table.id )
Left Join "Event" event ON ( pub.id = event."publicationId" )
Left Join "Recruiter" recruiter ON ( recruiter.id = user_table."recruiterId" )
Left Join "Entreprise" entreprise ON ( entreprise.id = recruiter."entrepriseId" )
WHERE pub.type = 'event'::"EnumTypePub" 
AND (requesting_user_role() = 'admin'::text
     OR requesting_user_role() = 'recruiter_role'::text AND entreprise.id = current_entreprise_id()
     OR requesting_user_role() = 'candidate_role'::text AND event."deletedAt" IS NULL)
group by 
    pub.id,
    user_table.id,
    event.location,
    event.file,
    event."startDate",
    event.id,
    entreprise.id;`;
  await client.$queryRawUnsafe(queryCreateEventsView);

  //####################query seeding the videos to supabase#######################
  const queryCreateVideosView = `
  create or replace view "Videoview" as 
  SELECT count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'vue'::text) AS views,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'like'::text) AS likes,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'comment'::text) AS comments,
  count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'share'::text) AS shares,
pub.title,
  pub.description,
  user_table.id AS userid,
  entreprise.id AS entrepriseid,
  video."createdAt",
  video.id AS "videoId",
  video.url,
  category.label,
  video."deletedAt"
 FROM "Publication" pub
   LEFT JOIN "Socialinterraction" socialinterraction ON socialinterraction."publicationId" = pub.id
   LEFT JOIN "User" user_table ON pub."userId" = user_table.id
   LEFT JOIN "Video" video ON pub.id = video."publicationId"
 LEFT JOIN "Category" category ON video."categoryId" = category.id
   LEFT JOIN "Recruiter" recruiter ON recruiter."userId" = user_table.id
   LEFT JOIN "Entreprise" entreprise ON entreprise.id = recruiter."entrepriseId"
WHERE pub.type = 'video'::"EnumTypePub" AND entreprise.id = current_entreprise_id() AND pub.id = video."publicationId"  OR requesting_user_role() = 'admin'::text
GROUP BY pub.title, pub.description, user_table.id, entreprise.id, video.id, category.label;`;
  await client.$queryRawUnsafe(queryCreateVideosView);

  //#############################CONDIDATE LANGUDAGE ASSOCIATION TABLE ##############

  const queryCreateOffersView = `

  CREATE OR REPLACE VIEW public."Offersview"
  AS
  SELECT count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'vue'::text) AS views,
     count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'like'::text) AS likes,
     count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'comment'::text) AS comments,
     count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'share'::text) AS shares,
     "Publication".title,
     "Publication".description,
     "Offer"."offerType",
     "Entreprise".id AS "entrepriseId",
     "User".id AS "userId",
     "Publication".id AS "publicationId",
     "Offer"."isActive" AS isActive,
     count(DISTINCT "Feedback".id) AS attendees,
     "Offer".id as "offerId",
     "Offer"."createdAt" as "createdAt",
     "Offer"."deletedAt" as "deletedAt",
     "Socialinterraction"."createdAt" AS "dateInteraction",
     ( SELECT DISTINCT "Socialinterraction_1".id
     FROM "Socialinterraction" "Socialinterraction_1"
    WHERE "Publication".id = "Socialinterraction_1"."publicationId" AND "Socialinterraction_1".type = 'like'::text AND "Socialinterraction_1"."userId" = requesting_user_id()) AS "isLike",
    "Offer".place
    FROM "Publication"
      LEFT JOIN "Socialinterraction" ON "Socialinterraction"."publicationId" = "Publication".id,
     "Feedback"
      RIGHT JOIN "Offer" ON "Feedback"."offerId" = "Offer".id,
     "User",
     "Entreprise",
     "Recruiter"
     WHERE "Publication"."userId" = "User".id AND "Publication".type = 'offer'::"EnumTypePub" AND "Publication".id = "Offer"."publicationId" AND "Entreprise".id = "Recruiter"."entrepriseId" AND "Recruiter".id = "User"."recruiterId" AND (requesting_user_role() = 'admin'::text OR requesting_user_role() = 'recruiter_role'::text AND "Entreprise".id = current_entreprise_id() OR requesting_user_role() = 'candidate_role'::text AND "Offer"."isActive" = true AND "Offer"."deletedAt" IS NULL)
     GROUP BY "Publication".id, "Offer".id, "Entreprise".id, "User".id, "Socialinterraction"."createdAt";`;

  await client.$queryRawUnsafe(queryCreateOffersView);

  //############################# Retchee States view ##############

  const queryStatesView = `
  create or replace view "Retcheeview" as 
  SELECT count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'vue'::text) AS views,
count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'like'::text) AS likes,
count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'comment'::text) AS comments,
count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'share'::text) AS shares,  
  "Socialinterraction"."updatedAt",
  "Socialinterraction"."createdAt",
  "Entreprise"."id" as "entrepriseId",
  EXTRACT(MONTH FROM "Socialinterraction"."createdAt")::text AS creation_month,
  replace(to_char("Socialinterraction"."createdAt", 'd'::text), ' '::text, ''::text) AS creation_dayofweek,
  EXTRACT(year FROM "Socialinterraction"."createdAt")::text AS creation_year,
  EXTRACT(DAY FROM "Socialinterraction"."createdAt")::text AS creation_day,
  to_char("Socialinterraction"."createdAt", 'HH24'::text) AS creation_hour,
  EXTRACT('week' FROM "Socialinterraction"."createdAt")::text AS creation_week,
  TO_CHAR( "Socialinterraction"."createdAt", 'W' )::text  AS creation_weekofmonth,
  "Publication".type AS publication_type,
  "Publication".id as "publicationId"
  FROM "Socialinterraction"
  left join "Publication" on "Publication".id = "Socialinterraction"."publicationId"
  left join "User" on "User".id = "Publication"."userId"
  left join "Recruiter" on "Recruiter"."userId" = "User".id
  left join "Entreprise" on "Entreprise"."id" = "Recruiter"."entrepriseId" 
  where "Entreprise".id = current_entreprise_id() Or requesting_user_role() = 'admin'::text
  GROUP BY  "Socialinterraction"."updatedAt", "Socialinterraction"."createdAt","Entreprise"."id", "Publication".type, "Publication".id
  ORDER BY "Socialinterraction"."createdAt"`;
  await client.$queryRawUnsafe(queryStatesView);

  //##################   Offer Feedback Stats View   #####################################

  const queryOfferFeedbackStatsView = `
  create or replace view "OfferFeedbackStatsView" as 
  SELECT 
  "Feedback"."updatedAt",
  "Feedback"."createdAt",
  "Entreprise"."id" as "entrepriseId",
  "Offer"."id" as "offerId",
  EXTRACT(MONTH FROM "Feedback"."createdAt")::text AS creation_month,
  replace(to_char("Feedback"."createdAt", 'd'::text), ' '::text, ''::text) AS creation_dayofweek,
  EXTRACT(year FROM "Feedback"."createdAt")::text AS creation_year,
  EXTRACT(DAY FROM "Feedback"."createdAt")::text AS creation_day,
  to_char("Feedback"."createdAt", 'HH24'::text) AS creation_hour,
  EXTRACT('week' FROM "Feedback"."createdAt")::text AS creation_week,
  TO_CHAR( "Feedback"."createdAt", 'W' )::text  AS creation_weekofmonth,
  count(DISTINCT "Feedback".id) AS applicants,
  "Publication".id as "publicationId"
  FROM "Feedback"
  left join "Offer" on "Feedback"."offerId" = "Offer".id 
  left join "Publication" on "Publication".id = "Offer"."publicationId" 
  left join "User" on "User".id = "Publication"."userId"
  left join "Recruiter" on "Recruiter"."userId" = "User".id
  left join "Entreprise" on "Entreprise"."id" = "Recruiter"."entrepriseId" 
  where ("Entreprise".id = current_entreprise_id() Or requesting_user_role() = 'admin'::text) and "Publication".type ='offer'
  GROUP BY  "Feedback"."updatedAt", "Feedback"."createdAt","Entreprise"."id",  "Publication".id, "Offer"."id"
  ORDER BY "Feedback"."createdAt";`;
  await client.$queryRawUnsafe(queryOfferFeedbackStatsView);

  //#############################  User Likes View  ##############

  const queryUserLikesView = `
     create or replace view "UserLikesView" as 
     SELECT count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'like'::text) AS likes,
       "Entreprise".id AS entrepriseid,
       "Entreprise".name AS entreprisename,
       "User".id AS userid
      FROM "Socialinterraction",
       "Publication",
       "User",
       "Candidate",
       "Post",
       "Entreprise"
     WHERE "Socialinterraction"."userId" = requesting_user_id() 
     AND "Socialinterraction"."publicationId" = "Publication".id 
     AND "Publication".id = "Post"."publicationId" 
     AND "Socialinterraction"."publicationId" = "Publication".id 
     AND "User".id = "Publication"."userId" 
     AND "User"."candidateId" = "Candidate".id 
     AND "Publication".type = 'post'::"EnumTypePub"
     AND "Publication"."postId" = "Post".id 
     AND "Entreprise".id = "Post"."entrepriseId" 
     AND "Socialinterraction"."publicationId" = "Publication".id
     GROUP BY "Entreprise".id, "User".id;`;
  await client.$queryRawUnsafe(queryUserLikesView);




  //#############################  Applyed Candiate List  View  ##############
  const ApplyedCandiateList = `
  create or replace view "ApplyedCandiateList" as 
  SELECT count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'like'::text) AS likes,
  count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'comment'::text) AS comments,
  count("Socialinterraction".type) FILTER (WHERE "Socialinterraction".type = 'share'::text) AS shares, 
  "Feedback".statue AS feedbackstatus,
  "Offer"."isActive" AS offerstatus,
  "Feedback"."contenu" AS content,
  "Offer"."offerType" AS offertype,
  "User"."id" AS userid,
  "User"."photo" AS photo,
  "User"."email" AS email,
  "Offer"."id" AS offerid,
  "Feedback"."id" AS Feedback,
  "User"."firstName",
  "User"."lastName",
  "Job".name as job,
  "Candidate"."personalCv",
  "Candidate"."mediaLink",
  (select 1 from "User" user_table where user_table.id = "User".id and user_table.id in ( select "Socialinterraction"."userId"  from "Socialinterraction" 
  group by "Socialinterraction"."userId"
  order by  count("Socialinterraction"."userId") desc
  limit 20 )) as "isFavourite"
 FROM "Offer",
 "Socialinterraction",
  "User",
  "Candidate" left join "Job" on "Job".id = "Candidate"."jobId",
  "Feedback"
WHERE "Feedback"."userId" = "User".id 
AND "User"."candidateId" = "Candidate".id 
AND "Feedback"."offerId" = "Offer".id 
AND "Feedback".statue IN('waiting','approved','rejected','inporgress')
GROUP BY "Feedback".statue,
"Offer"."isActive",
"Feedback".contenu,
"Offer"."offerType",
"User"."id",
"User"."photo",
"User"."email",
"Offer"."id",
"Feedback"."id",
"User"."firstName",
"User"."lastName",
"Job".name,
"Candidate"."personalCv",
"Candidate"."mediaLink";`;
  await client.$queryRawUnsafe(ApplyedCandiateList);

  //#############################  community Candidate List  View with upcoming subscribed events  ##############
  const CandidateCommunityView = `
  create or replace view "CandidateCommunityView" as 
  SELECT "Community".name,
  "Community"."activityField",
  "Candidate".id AS candidatid,
"User".id AS userid,
"Community".id AS communityid,
"User".photo,
"Event".location,
"Event"."startDate" As startdate,
"Event"."endDate" AS  enddate,
"Event"."file",
"Event"."link",
"Event"."speakers",
"Publication".id AS publicationid
 FROM "Community",
  "User",
  "Candidate",
  "Candidatecommunity",
"Event",
"Publication"
WHERE "User".id = "Candidate"."userId" 
AND "Event"."publicationId" = "Publication".id
AND "Publication"."userId" = "User".id
AND NOW()::TIMESTAMP < "Event"."startDate"
AND "Candidatecommunity"."candidateId" = "Candidate".id
AND "Candidatecommunity"."communityId" = "Community".id;`;
  await client.$queryRawUnsafe(CandidateCommunityView);

  // create function that return the userid of the creator of the publication
  const useridfn = `CREATE OR REPLACE FUNCTION useridFn(pub_id TEXT) 
returns TEXT
LANGUAGE plpgsql
AS
$do$
DECLARE user_id TEXT;
BEGIN
SELECT "User"."id"
INTO user_id
FROM "User","Publication","Socialinterraction"
WHERE "Socialinterraction"."publicationId" = "Publication"."id"
AND "Publication"."userId" = "User"."id"
AND "Publication"."id" = pub_id;
return user_id;
end;
$do$;`;
  await client.$queryRawUnsafe(useridfn);

  // create function that return the publication ID of specifique publication
  const publicationType = `CREATE OR REPLACE FUNCTION publicationType(pub_id TEXT) 
returns TEXT
LANGUAGE plpgsql
AS
$do$
DECLARE user_id TEXT;
BEGIN
SELECT "Publication"."type"
INTO user_id
FROM "User","Publication","Socialinterraction"
WHERE "Socialinterraction"."publicationId" = "Publication"."id"
AND "Publication"."userId" = "User"."id"
AND "Publication"."id" = pub_id;
return user_id;
end;
$do$;`;
  await client.$queryRawUnsafe(publicationType);

  // create function that returns trigger on the socialinterraction table
  const notifyLike = `CREATE OR REPLACE FUNCTION notifyLike() RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $do$
BEGIN 
IF NEW.type='like' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",'like',public."useridfn"(new."publicationId"),new."createdAt",public."publicationtype"(new."publicationId"),null,public."startdateevent"(new."publicationId"),null,null);
RETURN NEW;
ELSEIF NEW.type='comment' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",'comment',public."useridfn"(new."publicationId"),new."createdAt",public."publicationtype"(new."publicationId"),null,public."startdateevent"(new."publicationId"),null,null);
RETURN NEW;
ELSEIF NEW.type ='vue' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",'vue',public."useridfn"(new."publicationId"),new."createdAt",public."publicationtype"(new."publicationId"),null,public."startdateevent"(new."publicationId"),null,null);
RETURN NEW;
ELSEIF NEW.type ='share' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",'share',public."useridfn"(new."publicationId"),new."createdAt",public."publicationtype"(new."publicationId"),null,public."startdateevent"(new."publicationId"),null,null);
RETURN NEW;
ELSEIF NEW.type ='attend' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",'attend',public."useridfn"(new."publicationId"),new."createdAt",public."publicationtype"(new."publicationId"),null,public."startdateevent"(new."publicationId"),null,null);
RETURN NEW;
END IF;
END;
$do$;`;
  await client.$queryRawUnsafe(notifyLike);

  //############################### socialinnterraction trigger #############################################################
  const notificationTrigger = `CREATE OR REPLACE TRIGGER notificationTrigger AFTER INSERT ON public."Socialinterraction" FOR EACH ROW EXECUTE PROCEDURE notifyLike();`;
  await client.$queryRawUnsafe(notificationTrigger);

  // ################################ Notifications after status changing on the subscribed job offers status ######################
  const notifyStatueSubscribedOffers = `CREATE OR REPLACE FUNCTION notifyStatueSubscribedOffers() RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $do$
BEGIN 
IF NEW.statue='waiting' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",null,null,new."createdAt",null,new."statue",null,new."offerId",null);
RETURN NEW;
ELSEIF NEW.statue='approved' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId")  VALUES (new."userId",null,null,new."createdAt",null,new."statue",null,new."offerId",null);
RETURN NEW;
ELSEIF NEW.statue ='rejected' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId")  VALUES (new."userId",null,null,new."createdAt",null,new."statue",null,new."offerId",null);
RETURN NEW;
ELSEIF NEW.statue ='inporgress' THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId")  VALUES (new."userId",null,null,new."createdAt",null,new."statue",null,new."offerId",null);
RETURN NEW;
END IF;
END;
$do$;`;
  await client.$queryRawUnsafe(notifyStatueSubscribedOffers);

  //############################### subscribed job offers trigger #############################################################
  const applyedOffersNootificationTrigger = `CREATE OR REPLACE TRIGGER applyedOffersNootificationTrigger AFTER INSERT ON public."Feedback" FOR EACH ROW EXECUTE PROCEDURE notifyStatueSubscribedOffers();`;
  await client.$queryRawUnsafe(applyedOffersNootificationTrigger);

  //################################# function returns the event ID  ################################################
  const eventIdFunction = `CREATE OR REPLACE FUNCTION eventIdFunction(pub_id TEXT) 
returns TEXT
LANGUAGE plpgsql
AS
$do$
DECLARE event_id TEXT;
BEGIN
SELECT "Publication"."eventId"
INTO event_id
FROM "User","Publication","Socialinterraction"
WHERE "Socialinterraction"."publicationId" = "Publication"."id"
AND "Publication"."userId" = "User"."id"
AND "Publication"."id" = pub_id;
return event_id;
end;
$do$;`;
  await client.$queryRawUnsafe(eventIdFunction);

  //################################# function returns the Start Date of an Event ################################################
  const startDateEvent = `CREATE OR REPLACE FUNCTION startDateEvent(pub_id TEXT) 
 returns TIMESTAMP
 LANGUAGE plpgsql
 AS
 $do$
 DECLARE start_date TIMESTAMP;
 BEGIN
 SELECT "Event"."startDate"
 INTO start_date
 FROM "Event"
 WHERE "Event"."id" = eventidfunction(pub_id);
 return start_date;
 end
$do$;`;
  await client.$queryRawUnsafe(startDateEvent);

  //################################# function returns the Publication ID of a publication releated to an event ################################################
  const publicationTypeFn = `CREATE OR REPLACE FUNCTION publicationTypeFn(pub_id TEXT) 
 returns TEXT
 LANGUAGE plpgsql
 AS
 $do$
 DECLARE pub_type TEXT;
 BEGIN
SELECT "Publication"."type"
INTO pub_type
FROM "User","Publication","Socialinterraction"
WHERE "Socialinterraction"."publicationId" = "Publication"."id"
AND "Publication"."userId" = "User"."id"
AND "Publication"."id" = pub_id;
return pub_type;
end;
 $do$;`;
  await client.$queryRawUnsafe(publicationTypeFn);

  //################################# function returns a trigger on the socialinterraction table that triggers the started subscribed events  ################################################
  const notifyStatueSubscribedEvents = `CREATE OR REPLACE FUNCTION notifyStatueSubscribedEvents() RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $do$
BEGIN 
IF public."publicationtypefn"(new."publicationId")='event' AND CURRENT_DATE=public."startdateevent"(new."publicationId") THEN
INSERT INTO public."Notification"("userId", event, "posterId", "createdAt", "publicationType", statue, "startDate", "offerId", "eventId") VALUES (new."userId",null,null,null,null,null,public."startdateevent"(new."publicationId"),null,public."eventidfunction"(new."publicationId"));
END IF;
RETURN NEW;
END;
$do$;`;
  await client.$queryRawUnsafe(notifyStatueSubscribedEvents);

  //############################### started subscribed events trigger #############################################################
  const subscribedEventsNotfifcationTrigger = `CREATE OR REPLACE TRIGGER subscribedEventsNotfifcationTrigger AFTER INSERT ON public."Socialinterraction" FOR EACH ROW EXECUTE PROCEDURE notifyStatueSubscribedEvents();`;
  await client.$queryRawUnsafe(subscribedEventsNotfifcationTrigger);

  client.$disconnect();
  console.info("Seeding database with custom seed...");

  console.info("Seeded database successfully");
  // ########################## community post List  View ###########################################
  const CommunityPostView=`CREATE OR REPLACE VIEW public."CommunityPosts"
  AS
  SELECT count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'vue'::text) AS views,
     count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'like'::text) AS likes,
     count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'comment'::text) AS comments,
     count(socialinterraction.type) FILTER (WHERE socialinterraction.type = 'share'::text) AS shares,
     count(followentreprise."entrepriseId") AS followers,
     publication_table.title,
     com.name AS "communityName",
     com.id AS "communityId",
     entreprise.name AS "entrepriseName",
     publication_table.description,
     recruiter."entrepriseId",
     publication_table."userId",
     publication_table.id AS "publicationId",
     candidate.id AS "candidateId",
     publication_table."deletedAt",
     publication_table."createdAt",
     post.image,
     socialinter.id AS "socialinterractionId",
     user_table."firstName",
     user_table."lastName",
     followentreprise."candidateId" AS followerid,
     followentreprise.id AS "followentrepriseId",
     user_table.photo AS "candidateImage",
         CASE
             WHEN (EXISTS ( SELECT soc.id,
                 soc."createdAt",
                 soc."updatedAt",
                 soc.type,
                 soc."publicationId",
                 soc."userId",
                 soc."deletedAt"
                FROM "Socialinterraction" soc
               WHERE soc.type = 'like'::text AND soc."publicationId" = publication_table.id AND soc."userId" = requesting_user_id())) THEN 1
             ELSE 0
         END AS islike,
         CASE
             WHEN (EXISTS ( SELECT us.id,
                 us."createdAt",
                 us."updatedAt",
                 us."firstName",
                 us."lastName",
                 us.username,
                 us.password,
                 us.roles,
                 us."candidateId",
                 us."recruiterId",
                 us.email,
                 us.phone,
                 us.address,
                 us.photo,
                 us.city,
                 us."kmRadius",
                 us.sex,
                 us.bio
                FROM "User" us
               WHERE us.id = requesting_user_id() AND us."candidateId" = followentreprise."candidateId")) THEN 1
             ELSE 0
         END AS isfollower
    FROM "Community" com
      JOIN "PublicationsOnCommunity" publicationspncommunity ON publicationspncommunity."communityId" = com.id
      JOIN "Publication" publication_table ON publicationspncommunity."publicationId" = publication_table.id
      LEFT JOIN "Socialinterraction" socialinterraction ON socialinterraction."publicationId" = publication_table.id
      LEFT JOIN "Socialinterraction" socialinter ON socialinter."publicationId" = publication_table.id AND socialinter."userId" = requesting_user_id()
      JOIN "User" user_table ON publication_table."userId" = user_table.id
      JOIN "Post" post ON post."publicationId" = publication_table.id
      LEFT JOIN "Recruiter" recruiter ON recruiter."userId" = user_table.id
      LEFT JOIN "Entreprise" entreprise ON entreprise.id = recruiter."entrepriseId"
      LEFT JOIN "FollowEntreprise" followentreprise ON entreprise.id = followentreprise."entrepriseId"
      LEFT JOIN "Candidate" candidate ON candidate.id = user_table."candidateId"
      LEFT JOIN "Candidate" ca ON ca.id = followentreprise."candidateId"
   WHERE publication_table.type = 'post'::"EnumTypePub"
   GROUP BY entreprise.id, publicationspncommunity.id, publication_table.title, publication_table.description, recruiter."entrepriseId", publication_table."userId", candidate.id, publication_table.id, publication_table."deletedAt", publication_table."createdAt", com.name, post.image, com.id, user_table."firstName", user_table."lastName", user_table.photo, followentreprise."candidateId", followentreprise.id, socialinter.id;
 `
  await client.$queryRawUnsafe(CommunityPostView);
}
