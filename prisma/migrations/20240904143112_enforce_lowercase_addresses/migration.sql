-- consolidate duplicate wallets
with dupes as (select w1.id as w1_id, w2.id as w2_id from "Wallet" w1 inner join "Wallet" w2 on LOWER(w1.address) = LOWER(w2.address) and w1.id < w2.id)
update "WalletHat" set "walletId" = dupes.w1_id from dupes where "walletId" = dupes.w2_id;

with dupes as (select w1.id as w1_id, w2.id as w2_id from "Wallet" w1 inner join "Wallet" w2 on LOWER(w1.address) = LOWER(w2.address) and w1.id < w2.id)
update "Badge" set "walletId" = dupes.w1_id from dupes where "walletId" = dupes.w2_id;

with dupes as (select w1.id as w1_id, w2.id as w2_id from "Wallet" w1 inner join "Wallet" w2 on LOWER(w1.address) = LOWER(w2.address) and w1.id < w2.id)
update "Profile" set "walletId" = dupes.w1_id from dupes where "walletId" = dupes.w2_id;

with dupes as (select w1.id as w1_id, w2.id as w2_id from "Wallet" w1 inner join "Wallet" w2 on LOWER(w1.address) = LOWER(w2.address) and w1.id < w2.id)
delete from "Wallet" using dupes where "Wallet".id = w2_id;

-- make sure all addresses are lowercase
update "Wallet" set address = LOWER(address);

-- enforce check going forward
ALTER TABLE "Wallet" ADD CONSTRAINT address_lowercase_check CHECK (address = LOWER(address));
