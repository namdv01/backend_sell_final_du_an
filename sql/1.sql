INSERT INTO public."user"
(id, email, "password", fullname, phone, avatar, gender, "role", "numberShop")
VALUES('108fa497-deef-4b57-a439-97307e0d20f3'::uuid, 'doandu@gmail.com', '$2a$10$GWtbDhcr25OVijIZEVLnEeoaIIgRwwhKCQC16BjomWjhQfpIK/HBa', 'Đoàn Văn Dự', '0328574522', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1680576747/sale_final/avatar/gwyp9w2rzsemoudkwuxq.png', 'male', 'buyer', 0);
INSERT INTO public."user"
(id, email, "password", fullname, phone, avatar, gender, "role", "numberShop")
VALUES('4782e32e-fd72-4722-b855-4837f08811a8'::uuid, 'kien@gmail.com', '$2a$10$tga5XpxgGgV.tM45SIvP1elraZZpmSvELsfLZ1FoYyZuosRV68W/i', 'Nguyễn Hữu Kiên', '0328574444', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1680576831/sale_final/avatar/kdw8zk4svptnwbavhfrm.png', 'female', 'buyer', 0);
INSERT INTO public."user"
(id, email, "password", fullname, phone, avatar, gender, "role", "numberShop")
VALUES('94b93a71-25d9-4af7-8d7b-0b49bf5ef8d3'::uuid, 'namdv@gmail.com', '$2a$10$yIodtGITMFW8pbYMHxQ6AuE910sadae7I.jQ8VgnghNzZoIhPRJ56', 'Đỗ Văn Nam', '0339501427', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1680365572/sale_final/avatar/g6vlzyj9zhe7sexinftu.jpg', 'male', 'admin', 0);
INSERT INTO public."user"
(id, email, "password", fullname, phone, avatar, gender, "role", "numberShop")
VALUES('8c2d9fa1-5e80-48b0-a500-f8a215606ae8'::uuid, 'buyer1@gmail.com', '$2a$10$GgeXznbC8kLzcXyYxZ2N5.PlxaeXoewSg2xuKHi.uUdpsREVz6Ysq', 'Nguyễn Văn A', '09696963300', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681138172/sale_final/avatar/mdnfifnkz7kjwngd4xac.png', 'other', 'seller', 20);
INSERT INTO public."user"
(id, email, "password", fullname, phone, avatar, gender, "role", "numberShop")
VALUES('3e5b7230-9b77-4721-9da0-541defa68496'::uuid, 'vietha@gmail.com', '$2a$10$tKvqM1MNeATVmYXHd/4Z7O6qvsSnVBbQKZX9tZGb.c9bM.QuOBHW.', 'Phạm Việt Hà', '0328574567', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1680576885/sale_final/avatar/k0pvimzhrlecndrzyzoh.jpg', 'female', 'seller', 18);


INSERT INTO public.shop
(id, id_user, "name", address, logo)
VALUES('fd495f15-654a-4ebe-ad9f-57dcd2d6f03c'::uuid, '8c2d9fa1-5e80-48b0-a500-f8a215606ae8'::uuid, 'Hoàng Hà Mobile', '392 Cầu Giấy', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681221397/sale_final/logo/rblc4hia5uic02qcigno.png');
INSERT INTO public.shop
(id, id_user, "name", address, logo)
VALUES('eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid, '3e5b7230-9b77-4721-9da0-541defa68496'::uuid, 'Thế giới di động', '171 Thái Hà', 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231509/sale_final/logo/idewtqdviak8wvnzayqt.png');


INSERT INTO public."productImage"
(id, id_product, image)
VALUES('051bdcc4-677c-43a3-94c7-643c14cf0572'::uuid, '933d59a1-7d46-4eb4-81c9-90eb750e3e86'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681223254/sale_final/product/s5xuvk5i742yowr3lz55.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('eef85da0-b966-49fe-8e3b-6403bcb9c2d4'::uuid, '933d59a1-7d46-4eb4-81c9-90eb750e3e86'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681223254/sale_final/product/mjitdnmre1nrkvcikwqe.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ac529675-9d69-40f6-b553-93517e408737'::uuid, '3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310091/sale_final/product/pxoyvcox869zdt3hw19p.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('707b4dfc-c7a9-4be2-836a-3ca5d21c3280'::uuid, '933d59a1-7d46-4eb4-81c9-90eb750e3e86'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681224989/sale_final/product/nxvw5jmzsooziritvcff.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('060a4ab4-56a0-430e-924e-f1df82d9c385'::uuid, '3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231300/sale_final/product/wb5tzab1jvmq40nkwg6d.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f432ac0d-0b8c-431c-94ce-aa9cbed316f1'::uuid, '3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231300/sale_final/product/li0tys6vquovizhk2fhq.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('648fd566-0589-4db3-9b00-ba0e87e45bc9'::uuid, '3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231299/sale_final/product/ygw8sgk1prra5ohiybmj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('3cf15a2e-9daf-48a9-a9bb-50747d50156f'::uuid, '3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231299/sale_final/product/rqr6hafdrzzb9adihr1v.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('291ed0cc-62e8-43c9-b05b-9df8ac9146d0'::uuid, 'b9292065-e975-4100-85f9-74db13e892f2'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231727/sale_final/product/csmdsdlnmfyyteeq8mbn.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c280e028-dc50-4b5e-9d09-2ad672b0fd9a'::uuid, 'b9292065-e975-4100-85f9-74db13e892f2'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231727/sale_final/product/ebfldw8jlek8holb2kvb.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('13fb3ffc-0e56-40b9-88ce-c7cf2daf7379'::uuid, 'b9292065-e975-4100-85f9-74db13e892f2'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231727/sale_final/product/y4k9ez597lr5lj3wscyj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('7e8def81-9986-40fe-aa4b-8934bfb5f026'::uuid, 'b9292065-e975-4100-85f9-74db13e892f2'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681231727/sale_final/product/kynpnzsnlaylb0rawair.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('5b8c9223-9c8a-477a-a2ed-dee544171901'::uuid, 'f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309777/sale_final/product/fxwv3wxrhesam7n87ws4.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f9111c51-353d-488b-be70-77cd2f6793e5'::uuid, 'f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309777/sale_final/product/sugrewbmhjgzglvixooh.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('b8d4c19f-83d4-4aab-b0a0-f7c8379210bc'::uuid, 'f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309777/sale_final/product/kqgu1nrfd78q6ghwb66u.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('76cbcdde-daef-430c-a0ff-3a307f62d195'::uuid, 'f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309777/sale_final/product/gjznvjjivujcqdypqswt.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('d2cfdcca-c5df-437c-92c7-3acb59c60d36'::uuid, '3c796f64-dd24-4541-9c13-23467f2ad665'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309921/sale_final/product/sqekmws4cvaleo5lll4j.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('08ef8517-852f-42ac-87ad-8a49bb6385e5'::uuid, '3c796f64-dd24-4541-9c13-23467f2ad665'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309921/sale_final/product/lzolyyz2v2vkq2iikrny.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('15a430ea-4915-4fee-acfc-cc04948d1ce6'::uuid, '3c796f64-dd24-4541-9c13-23467f2ad665'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309921/sale_final/product/b5scna933x2fvkdmd6t4.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f7106c2b-8cc2-49c0-8af9-8bbe327f5d52'::uuid, '3c796f64-dd24-4541-9c13-23467f2ad665'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681309921/sale_final/product/yvydgtme0i2fxntiv7ml.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('8b34be81-d3b5-4ab3-87b4-f191b60fd661'::uuid, '3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310091/sale_final/product/qlvvbuyduxvfp7aoharl.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('0e3060a2-87eb-4752-81b9-126ef4ce3686'::uuid, '3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310091/sale_final/product/tymsiicmhg6ulhcndeqp.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('5c01e194-1206-4369-86b8-35c8e74e5ea6'::uuid, '3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310091/sale_final/product/asutfoafomytwgixw3xe.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('e8b384e6-fde7-4c08-bcc9-cb6359cadded'::uuid, '0f9c5af5-43a7-4d9b-9b4e-f62720e1ec9c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310195/sale_final/product/fnro3kdkmafci1cah8pl.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('8e5bc54e-ddec-40ea-b9dd-8efdd337f6d8'::uuid, '0f9c5af5-43a7-4d9b-9b4e-f62720e1ec9c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310196/sale_final/product/ydq3znxbixnws5vixene.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('30cdabd9-a5a5-47d6-89a2-59824adf093c'::uuid, '0f9c5af5-43a7-4d9b-9b4e-f62720e1ec9c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310195/sale_final/product/lxccvljmx7du6lxblthy.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ee537c9f-4f21-4f31-a167-fa2e049b5f8f'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310343/sale_final/product/tckx5uqvlfvnx2fswyu8.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('1c4daeb7-db54-4137-928c-9ea7ad5af29f'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310343/sale_final/product/ofgdnl2jmig0vqninwvh.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f34ee9b5-325f-4d7d-9030-49973f3024ed'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310343/sale_final/product/utuxm82jbvl4bfwyggiz.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('06d6a82d-4f77-41f8-90c5-447cf9f2ecfb'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310343/sale_final/product/ghfjyj9gmyirkucd3o3l.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('0b907864-f48e-4a46-823d-5297e3aab665'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310343/sale_final/product/ykpont5hf0deqpz2w08g.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('e32becc0-efc2-40b2-acc3-bc2162af85ae'::uuid, '6cb03cae-c2b7-474d-8eb9-52beb82bddf7'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310453/sale_final/product/xtquhutui6sexqjj4zac.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('4a286f78-11e1-40fc-a41f-d508d265fc43'::uuid, '6cb03cae-c2b7-474d-8eb9-52beb82bddf7'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310453/sale_final/product/nlwosxk4wvgcnk1syfnj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c97bc36e-7024-4a0a-9105-4ba201c12983'::uuid, '6cb03cae-c2b7-474d-8eb9-52beb82bddf7'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310453/sale_final/product/e38okripopfptnxkz8vo.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('a61c1c95-b6cc-46a0-b94d-dfa2ffb984a2'::uuid, '6cb03cae-c2b7-474d-8eb9-52beb82bddf7'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310453/sale_final/product/n8ilpunylkteb79dxsgc.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('91922ea2-7a46-41ba-80e2-d2ad78780eb8'::uuid, '4fbdde75-02fb-4726-9b23-d6f7d78524c9'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310547/sale_final/product/tjzwh0eskza06gmdxsjg.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('168b84e5-21d8-4960-8c31-111352d90d4c'::uuid, '4fbdde75-02fb-4726-9b23-d6f7d78524c9'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310547/sale_final/product/ovlxfjh2hw6mnkkx91xp.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c42cc5f2-9a82-4ba3-a5ac-510496af5c01'::uuid, '4fbdde75-02fb-4726-9b23-d6f7d78524c9'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310547/sale_final/product/fwif0klak3qyaofrcqly.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('16a5a66f-89e3-4b90-9cf0-13fe2cb0a1cd'::uuid, '4fbdde75-02fb-4726-9b23-d6f7d78524c9'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310547/sale_final/product/hjwd6xqal9gtsdpao5zu.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('acbd18f2-faec-4355-a303-4d0355cd69fc'::uuid, '2416a013-66ed-4011-9899-70f214887ff4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310661/sale_final/product/jdsdh5itc2nl3c8kvzwq.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('3ea06507-ea77-4f65-bf01-801939ffaee5'::uuid, '2416a013-66ed-4011-9899-70f214887ff4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310661/sale_final/product/iijfsaklztftzmuimlcj.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('bd30df43-e259-4ef7-ac7f-0789b54cae9a'::uuid, '2416a013-66ed-4011-9899-70f214887ff4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310661/sale_final/product/t1dgfpgnaerwmozbnnjj.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('0cdc0c69-ce7f-4f0c-8ebb-1d72d2d02a76'::uuid, '2416a013-66ed-4011-9899-70f214887ff4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310661/sale_final/product/bzevoo9vmoqatjif9jny.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('4fd9b233-6c77-4bd5-a58e-24970ae7bddc'::uuid, '6e756f69-aa29-4ee1-bd02-7ab0241fba4e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310768/sale_final/product/bfyyy06ieyxgj0v17nrk.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ee6949f3-6bdc-485a-9fd6-441bb35fa225'::uuid, '6e756f69-aa29-4ee1-bd02-7ab0241fba4e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310768/sale_final/product/vpdoqyy3ix0xa7onlfgc.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('d306bd00-e26d-49f2-adb5-e62033805456'::uuid, '6e756f69-aa29-4ee1-bd02-7ab0241fba4e'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310768/sale_final/product/a5t9pkn7fnwpdr8mhdyp.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('71025f01-dbe3-4c6e-84e2-60c79409308a'::uuid, 'b6b8b3f2-aab8-4483-adcd-10bfa766661f'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310892/sale_final/product/zl14nhqmvt3respkowrg.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('b617900e-603c-4b6d-8ddd-0a68259b95b9'::uuid, 'b6b8b3f2-aab8-4483-adcd-10bfa766661f'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310892/sale_final/product/bliokkipdqrgt0hkpafm.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('bc35526e-d31d-4efb-a140-1322c7b68f25'::uuid, 'b6b8b3f2-aab8-4483-adcd-10bfa766661f'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310892/sale_final/product/ngfjr7tphnsjpdlfif52.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('6f3a4ad1-08ba-4526-8d98-bb565dd4d5dd'::uuid, 'b6b8b3f2-aab8-4483-adcd-10bfa766661f'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681310892/sale_final/product/pqvppppzfp90s7wwhjvy.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('1ddf89de-c270-41da-962b-abc34174ea45'::uuid, '3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311418/sale_final/product/dpa6jx9qsvpa0pb8ynvj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ea2c9d1d-426d-485b-8951-93324edb15ab'::uuid, '3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311418/sale_final/product/wli6lmepxrpjhzmkkz7x.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ab357039-f4d2-4650-b123-a1634891274e'::uuid, '3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311418/sale_final/product/wpw48mwfxjtbqhmmaa1l.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('38080dfb-d6dd-483d-b90a-6c52fd2c9513'::uuid, '3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311418/sale_final/product/z2qoux2vedozbshh8xtd.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('e5a0dbbb-d04e-4e55-a272-a1c691359963'::uuid, '08b6e9a6-7cab-4f15-8dd8-237ddd966f49'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311510/sale_final/product/orms6iqzhbmkzyknqp0c.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('09d23c51-6ac2-4a4f-b350-0246f88c954d'::uuid, '08b6e9a6-7cab-4f15-8dd8-237ddd966f49'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311510/sale_final/product/nlwiqhvhfpdp1haco0mi.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('96a806d7-596d-43bb-9863-be94339678c4'::uuid, '08b6e9a6-7cab-4f15-8dd8-237ddd966f49'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311510/sale_final/product/rijny7t733ueghph9yng.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('72e77aa3-4b62-46d6-9e2f-0d86ffc5c2a2'::uuid, 'e10a1dc7-b274-4ccf-9795-205e71aa4623'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311631/sale_final/product/iyygllrm3lnni5xejyap.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('cbfc3df4-b663-454a-81bc-b8f2615534aa'::uuid, 'e10a1dc7-b274-4ccf-9795-205e71aa4623'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311631/sale_final/product/r0jiwras9eawc445xnl6.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c271852f-cffc-4d61-88ff-1eb06d837e81'::uuid, 'e10a1dc7-b274-4ccf-9795-205e71aa4623'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311631/sale_final/product/fpkkelfq6lblthqrtgp3.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('a8539b9c-555a-484b-8097-658093bc803e'::uuid, 'e10a1dc7-b274-4ccf-9795-205e71aa4623'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311632/sale_final/product/bgwndv2qkc5mofownmv5.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('bf32030c-ba26-435c-b422-ef9f7326e01c'::uuid, '39aaed22-c968-455c-94f3-c2c982d4ba38'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311747/sale_final/product/byah0ahywamc3hnkh6ut.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('5eebe293-cb84-45e6-9cdb-67a154aa2d79'::uuid, '39aaed22-c968-455c-94f3-c2c982d4ba38'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311747/sale_final/product/yy69csuv558p0hpekfa2.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('34d047e9-6484-45c7-8faf-48156b110fee'::uuid, '39aaed22-c968-455c-94f3-c2c982d4ba38'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311747/sale_final/product/gp33poqw8dicjhiyklx0.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('17ae1145-7352-4714-978d-39b03023424a'::uuid, 'c7d15f54-0a0c-43f4-85a7-5fda0611a4c0'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311920/sale_final/product/f2ib3tmerxx36vpqw270.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('593e2440-c2ff-4c7c-a76d-0f029cd12b9e'::uuid, 'c7d15f54-0a0c-43f4-85a7-5fda0611a4c0'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311920/sale_final/product/zwbojvclwydji5lugdkv.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('56242a44-10e6-4542-afb6-b2355b68feac'::uuid, 'c7d15f54-0a0c-43f4-85a7-5fda0611a4c0'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681311920/sale_final/product/cuwhxwgevicibr05jqpe.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('9e937245-2dd8-419b-9b27-dbad6323c66f'::uuid, 'ab8488be-3778-4fe5-94fb-d1b80b576a7c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312000/sale_final/product/lfizrzvacsdcbaj8zcdd.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ce8e523d-69f1-4be4-90a5-85d662d3404a'::uuid, 'ab8488be-3778-4fe5-94fb-d1b80b576a7c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312000/sale_final/product/ep1irfmheoq7exrgaubj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('ed475b5f-33e0-4c3b-a78c-addb942aa9d0'::uuid, 'ab8488be-3778-4fe5-94fb-d1b80b576a7c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312000/sale_final/product/dh3sr8zlt9ynvu43htdr.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('7f9bdc81-c464-436d-9148-eb7bb73c9839'::uuid, 'ab8488be-3778-4fe5-94fb-d1b80b576a7c'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312000/sale_final/product/pkb6mjtrfbk9ohfvflkf.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('013ac84c-9c3c-4bbf-9acd-3ba14809cc56'::uuid, '68db5476-7a18-473b-be45-6925d9a714af'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312090/sale_final/product/vjoayqwfvspcmtqrx4nj.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('777cd936-4442-4257-a621-2695d0906433'::uuid, '68db5476-7a18-473b-be45-6925d9a714af'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312090/sale_final/product/lpjtsqs2vm21ujbuwwrd.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('a0f8ce41-a916-4a66-907e-517dbda9cc3d'::uuid, '68db5476-7a18-473b-be45-6925d9a714af'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312090/sale_final/product/zvux9u2vfwatplpfegwu.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('b1ee632d-daad-4a49-94d3-25b71f57cc90'::uuid, 'c2b92779-2670-4b5c-bc17-7883bb41224d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312175/sale_final/product/oqdgu2rx73by8q2yemc3.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('8bf6b6a2-ae37-4aed-b8eb-433f0fabb871'::uuid, 'c2b92779-2670-4b5c-bc17-7883bb41224d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312175/sale_final/product/x4gtln111n092x31hfpe.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('7f8241ba-d9c6-4ad2-a97f-e41ba052b643'::uuid, 'c2b92779-2670-4b5c-bc17-7883bb41224d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312175/sale_final/product/vhlnjcgp4lrft1pnmeoy.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('8336704f-440e-4668-a710-6a2f8c36690b'::uuid, 'c2b92779-2670-4b5c-bc17-7883bb41224d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312175/sale_final/product/iwhce59imteaw7znkl3r.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('d3b4392f-bdcb-4594-a1ce-dec3bb394c19'::uuid, 'c033fa26-cb38-4eda-994c-b7437566dccc'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312254/sale_final/product/eyktbt53lfhnddszodl1.png');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f9534c4d-b235-4d3d-bd8b-0fe3be944656'::uuid, 'c033fa26-cb38-4eda-994c-b7437566dccc'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312254/sale_final/product/s1z67jtatms4fvffybwu.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('77787da4-d96a-4632-8020-39a4dc5f0363'::uuid, 'c033fa26-cb38-4eda-994c-b7437566dccc'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312254/sale_final/product/xj28yrcjbs9j8difp0vi.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('398bd22d-8fc0-4119-a0da-e6e54d1fd8f3'::uuid, 'c033fa26-cb38-4eda-994c-b7437566dccc'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312254/sale_final/product/ja9rkrnkhqj93vqmqrjo.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('10355df9-7190-464a-9ef7-256f207a088b'::uuid, '03249040-9b0a-4abc-8700-c648687838c4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312347/sale_final/product/vsvjrzzoerabx5tdz3vs.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('f7eeafc7-2d2a-4da6-be4b-bf2a0243b4ff'::uuid, '03249040-9b0a-4abc-8700-c648687838c4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312347/sale_final/product/qdkdhfg5vcf1uevilgrh.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c64d1d6f-5712-45af-bab8-5bcdfab7a925'::uuid, '03249040-9b0a-4abc-8700-c648687838c4'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312347/sale_final/product/ktvlucoumuxt4vy0kdui.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('9f330b2a-263a-4327-be85-215b1810e2b8'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312434/sale_final/product/wpfwhwahvi0w1lowmxkh.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('0708a490-b0fe-4599-87c3-5c28e1b78ad1'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312434/sale_final/product/cujdi4uhmtz4f0iwzdlt.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('c9ae147c-a81b-49f1-9da7-18f724c801f1'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312434/sale_final/product/jthwyfciierhnflhmlzz.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('a7df9aa2-a1b8-4b83-8159-c50edb511dc1'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312434/sale_final/product/b5ikskpfbwqexaqeod5v.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('119fc73a-f0e7-4d85-a6f9-7f87fdd30c0e'::uuid, '7df77a29-0f71-407e-a16d-a42f3a71904d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312503/sale_final/product/siyuipxrs88s4kj3cgtd.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('77fcf48b-03ec-4ce3-8ac6-405225cf87bf'::uuid, '7df77a29-0f71-407e-a16d-a42f3a71904d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312503/sale_final/product/ikery6swfhjvbwoxurma.jpg');
INSERT INTO public."productImage"
(id, id_product, image)
VALUES('487ae6cc-1ed9-4076-a86a-f3e12a04fbe9'::uuid, '7df77a29-0f71-407e-a16d-a42f3a71904d'::uuid, 'https://res.cloudinary.com/dbnjt2htm/image/upload/v1681312503/sale_final/product/wixl4qavszkq9tuiwcg1.jpg');


INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 'Máy tính bảng iPad Pro M1', 12, 22990000, 'fd495f15-654a-4ebe-ad9f-57dcd2d6f03c'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('933d59a1-7d46-4eb4-81c9-90eb750e3e86'::uuid, 'iPhone 11(128G)', 10, 11500000, 'fd495f15-654a-4ebe-ad9f-57dcd2d6f03c'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('b9292065-e975-4100-85f9-74db13e892f2'::uuid, 'Điện thoại di động Vivo Y53s ', 40, 5590000, 'fd495f15-654a-4ebe-ad9f-57dcd2d6f03c'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 'đồng hồ applewatch', 30, 4790000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('3c796f64-dd24-4541-9c13-23467f2ad665'::uuid, 'Camera Gopro Hero 10', 4, 9890000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 'Cáp sạc dù Bagi TypeC', 80, 159000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('0f9c5af5-43a7-4d9b-9b4e-f62720e1ec9c'::uuid, 'Sạc nhanh Mophie Power Delivery 30W', 60, 390000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('d16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 'Laptop ASUS Vivobook X515EA-BQ3015W', 12, 14890000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('6cb03cae-c2b7-474d-8eb9-52beb82bddf7'::uuid, 'Loa Bluetooth LG XBoom Go PL2', 40, 550000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('4fbdde75-02fb-4726-9b23-d6f7d78524c9'::uuid, 'Laptop Apple M1 - MacBook Pro 13', 3, 27890000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('2416a013-66ed-4011-9899-70f214887ff4'::uuid, 'Màn hình MSI Optix MAG273 27inch/FHD/IPS', 16, 4890000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('6e756f69-aa29-4ee1-bd02-7ab0241fba4e'::uuid, 'Máy lọc không khí Daikin MC55UVM6', 18, 7200000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('b6b8b3f2-aab8-4483-adcd-10bfa766661f'::uuid, 'Điện thoại di động OPPO A94', 30, 5390000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 'Quạt Mini Quạt Cầm Tay Pisen Meatball', 300, 220000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('08b6e9a6-7cab-4f15-8dd8-237ddd966f49'::uuid, 'Ram Laptop Corsair Vengeance (CMSX8GX5M1A4800C40) 8GB', 80, 1250000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('e10a1dc7-b274-4ccf-9795-205e71aa4623'::uuid, 'Điện thoại di động realme 10 4G 8GB/256GB', 20, 5590000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('39aaed22-c968-455c-94f3-c2c982d4ba38'::uuid, 'Điện thoại Redmi Note 12 Pro 5G (8GB/256GB)', 20, 9190000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('c7d15f54-0a0c-43f4-85a7-5fda0611a4c0'::uuid, 'Bộ phát wifi Mi Router 4A Giga', 50, 610000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('ab8488be-3778-4fe5-94fb-d1b80b576a7c'::uuid, 'Sạc dự phòng Pisen Quick QP2 20.000mAh', 100, 450000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('68db5476-7a18-473b-be45-6925d9a714af'::uuid, 'Samsung Galaxy A73 5G', 10, 9790000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('c2b92779-2670-4b5c-bc17-7883bb41224d'::uuid, 'Tai nghe chụp tai có dây Motorola PULSE MAX WIRED SINGLE', 32, 590000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('c033fa26-cb38-4eda-994c-b7437566dccc'::uuid, 'Tai nghe không dây Havit TW935', 74, 370000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('03249040-9b0a-4abc-8700-c648687838c4'::uuid, 'Thẻ nhớ Thẻ nhớ Kingston 128GB', 56, 350000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 'Túi xách TOMTOC Briefcase Premium for Macbook 13', 22, 990000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);
INSERT INTO public.product
(id, "name", quantity, price, id_shop)
VALUES('7df77a29-0f71-407e-a16d-a42f3a71904d'::uuid, 'Thẻ nhớ USB OTG SanDisk Ultra 16GB ', 122, 130000, 'eff42b92-0f87-4fa7-bccc-5ebcb5c74bc6'::uuid);


INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('5bdaccce-ca49-48d5-b9bf-49a4123b6e29'::uuid, '8adf5cf9-70b9-429e-b899-df432e83ff70'::uuid, '3ff54a4d-54e5-451e-a2f8-2a96c6e7040e'::uuid, 2, 22990000);
INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('1527cc70-c541-475a-9e6f-1e1ec6c45974'::uuid, '8adf5cf9-70b9-429e-b899-df432e83ff70'::uuid, '933d59a1-7d46-4eb4-81c9-90eb750e3e86'::uuid, 2, 11500000);
INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('9abd6981-5948-4290-a823-8c97031701b5'::uuid, '76ea17da-88d1-447a-aa8f-9c414cf32fc5'::uuid, 'b9292065-e975-4100-85f9-74db13e892f2'::uuid, 2, 5590000);
INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('7a72af0d-a10a-4cea-bcab-5e0bccec7dac'::uuid, '76ea17da-88d1-447a-aa8f-9c414cf32fc5'::uuid, 'f49398ea-c5ea-4176-a235-e9a8229bfc94'::uuid, 2, 4790000);
INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('698959a0-5298-4d33-bac4-f8695c929e3f'::uuid, '7c75971e-80a4-4517-a5c8-704e75ff26a2'::uuid, '7df77a29-0f71-407e-a16d-a42f3a71904d'::uuid, 2, 130000);
INSERT INTO public."orderDetail"
(id, id_order, id_product, quantity, price)
VALUES('80d028f4-1562-4e29-a278-2d2b7674adae'::uuid, '7c75971e-80a4-4517-a5c8-704e75ff26a2'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, 1, 990000);


INSERT INTO public."order"
(id, id_buyer, status, "date", payment)
VALUES('8adf5cf9-70b9-429e-b899-df432e83ff70'::uuid, '4782e32e-fd72-4722-b855-4837f08811a8'::uuid, 'cancel', '2023-04-13 20:40:56.732', false);
INSERT INTO public."order"
(id, id_buyer, status, "date", payment)
VALUES('7c75971e-80a4-4517-a5c8-704e75ff26a2'::uuid, '4782e32e-fd72-4722-b855-4837f08811a8'::uuid, 'done', '2023-04-13 21:11:48.093', true);
INSERT INTO public."order"
(id, id_buyer, status, "date", payment)
VALUES('76ea17da-88d1-447a-aa8f-9c414cf32fc5'::uuid, '4782e32e-fd72-4722-b855-4837f08811a8'::uuid, 'cancel', '2023-04-13 20:44:21.147', false);


INSERT INTO public."comment"
(id, id_product, id_order, "content", star)
VALUES('66660170-18f8-4d65-82f3-ef2cea9052d9'::uuid, '79f6501f-4083-4d80-9b55-69a2a14409ec'::uuid, '7c75971e-80a4-4517-a5c8-704e75ff26a2'::uuid, 'Sản phẩm đúng như mô tả', 4);


INSERT INTO public.cart
(id, id_user, id_product, quantity)
VALUES('de5ce964-cb93-4b71-970d-37cf48e22863'::uuid, '4782e32e-fd72-4722-b855-4837f08811a8'::uuid, 'd16dce33-2a71-4087-91b9-edc315f12da8'::uuid, 2);
INSERT INTO public.cart
(id, id_user, id_product, quantity)
VALUES('1b33d376-4f82-49d0-80e7-cd31a800a405'::uuid, '4782e32e-fd72-4722-b855-4837f08811a8'::uuid, '3090e0f8-fdb7-4097-9295-509aaf497436'::uuid, 2);
INSERT INTO public.cart
(id, id_user, id_product, quantity)
VALUES('3eefe0eb-551d-46e0-b8e0-09ef253667c8'::uuid, '108fa497-deef-4b57-a439-97307e0d20f3'::uuid, '3e317fab-fd7a-496f-8a5d-b831b6e5ca23'::uuid, 1);
