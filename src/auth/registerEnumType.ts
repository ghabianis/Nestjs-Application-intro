import { registerEnumType } from "@nestjs/graphql";

export enum EnumUserSex {
    Homme = 'Homme',
    Femme = 'Femme'
}
registerEnumType(EnumUserSex, {
  name: "EnumUserSex",
});

export enum EnumTypePub {
  story = 'story',
  event = 'event',
  offer = 'offer',
  video = 'video',
  post = 'post'
}
registerEnumType(EnumTypePub, {
name: "EnumTypePub",
});