create table pcategory(
    CATEGORY_ID bigint not null auto_increment,
    NAME varchar not null,
    CREATION_DATE timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LAST_EDIT_DATE timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into pcategory (name) values ('캠핑');
insert into pcategory (name) values ('낚시');
insert into pcategory (name) values ('등산');
insert into pcategory (name) values ('스포츠');
insert into pcategory (name) values ('기타');
