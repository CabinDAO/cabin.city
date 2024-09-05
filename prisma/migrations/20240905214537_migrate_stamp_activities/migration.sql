-- move activities from badgeAdded to stampAdded
UPDATE "Activity" a SET type = 'StampAdded', "profileStampId" = x."psid" FROM (
    select a.id, ps.id as psid from "Activity" a inner join "Badge" b on a."badgeId" = b.id inner join "ProfileStamp" ps ON ps."profileId" = a."profileId" and ps."stampId" = b."specId" WHERE type = 'BadgeAdded'
) x WHERE a.id = x.id ;

-- fix jon's missing roleId on this activity
update "Activity" set "roleId" = 4 where id = 16;
