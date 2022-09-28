CREATE VIEW userList AS

SELECT "User"."id", "firstName","lastName","username","roles","email","phone","address", "userId" ,COUNT(type=='Like') as "like" ,COUNT(type=='Share') as "Share",count(type=='Comment') as "Comment" ,count(type=='View') as "View" 
	FROM   public."Socialinterraction" as e  , public."User"
	where public."User"."id" = e."userId"
	
	Group BY e."userId", public."User"."id"