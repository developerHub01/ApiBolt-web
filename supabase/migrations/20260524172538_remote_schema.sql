drop extension if exists "pg_net";


  create table "public"."app_install_events" (
    "id" uuid not null default gen_random_uuid(),
    "version" text,
    "created_at" timestamp with time zone not null default now(),
    "machine_id" text
      );


alter table "public"."app_install_events" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text not null,
    "user_name" text not null,
    "avatar_url" text,
    "cover_url" text,
    "bio" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."theme_device_installs" (
    "device_id" text not null,
    "theme_id" uuid not null default gen_random_uuid()
      );


alter table "public"."theme_device_installs" enable row level security;


  create table "public"."themes" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null default ''::text,
    "type" text not null default 'dark'::text,
    "preview" text not null,
    "palette" jsonb not null,
    "description" text not null,
    "author" uuid not null default auth.uid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "thumbnail" text not null,
    "version" smallint not null default '1'::smallint,
    "install_count" integer not null default 0
      );


alter table "public"."themes" enable row level security;


  create table "public"."unique_devices_installs" (
    "machine_id" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."unique_devices_installs" enable row level security;

CREATE UNIQUE INDEX app_install_event_pkey ON public.app_install_events USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_name_key ON public.profiles USING btree (user_name);

CREATE UNIQUE INDEX theme_device_install_pkey ON public.theme_device_installs USING btree (device_id, theme_id);

CREATE UNIQUE INDEX theme_pkey ON public.themes USING btree (id);

CREATE UNIQUE INDEX themes_palette_key ON public.themes USING btree (palette);

CREATE UNIQUE INDEX unique_devices_installs_pkey ON public.unique_devices_installs USING btree (machine_id);

alter table "public"."app_install_events" add constraint "app_install_event_pkey" PRIMARY KEY using index "app_install_event_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."theme_device_installs" add constraint "theme_device_install_pkey" PRIMARY KEY using index "theme_device_install_pkey";

alter table "public"."themes" add constraint "theme_pkey" PRIMARY KEY using index "theme_pkey";

alter table "public"."unique_devices_installs" add constraint "unique_devices_installs_pkey" PRIMARY KEY using index "unique_devices_installs_pkey";

alter table "public"."app_install_events" add constraint "app_install_events_machine_id_fkey" FOREIGN KEY (machine_id) REFERENCES public.unique_devices_installs(machine_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."app_install_events" validate constraint "app_install_events_machine_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_name_key" UNIQUE using index "profiles_user_name_key";

alter table "public"."theme_device_installs" add constraint "theme_device_install_theme_id_fkey" FOREIGN KEY (theme_id) REFERENCES public.themes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."theme_device_installs" validate constraint "theme_device_install_theme_id_fkey";

alter table "public"."themes" add constraint "theme_author_fkey" FOREIGN KEY (author) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."themes" validate constraint "theme_author_fkey";

alter table "public"."themes" add constraint "themes_install_count_check" CHECK ((install_count >= 0)) not valid;

alter table "public"."themes" validate constraint "themes_install_count_check";

alter table "public"."themes" add constraint "themes_palette_key" UNIQUE using index "themes_palette_key";

alter table "public"."themes" add constraint "themes_version_check" CHECK ((version > 0)) not valid;

alter table "public"."themes" validate constraint "themes_version_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_from_auth()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin

  insert into public.profiles (
    id,
    user_name,
    full_name,
    avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data->>'user_name',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_theme_install_count()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        -- Increase count when a new device installs
        UPDATE themes
        SET install_count = install_count + 1
        WHERE id = NEW.theme_id;
    ELSIF (TG_OP = 'DELETE') THEN
        -- Decrease count when a device uninstalls
        UPDATE themes
        SET install_count = GREATEST(0, install_count - 1)
        WHERE id = OLD.theme_id;
    END IF;
    RETURN NULL;
END;
$function$
;

grant delete on table "public"."app_install_events" to "anon";

grant insert on table "public"."app_install_events" to "anon";

grant references on table "public"."app_install_events" to "anon";

grant select on table "public"."app_install_events" to "anon";

grant trigger on table "public"."app_install_events" to "anon";

grant truncate on table "public"."app_install_events" to "anon";

grant update on table "public"."app_install_events" to "anon";

grant delete on table "public"."app_install_events" to "authenticated";

grant insert on table "public"."app_install_events" to "authenticated";

grant references on table "public"."app_install_events" to "authenticated";

grant select on table "public"."app_install_events" to "authenticated";

grant trigger on table "public"."app_install_events" to "authenticated";

grant truncate on table "public"."app_install_events" to "authenticated";

grant update on table "public"."app_install_events" to "authenticated";

grant delete on table "public"."app_install_events" to "service_role";

grant insert on table "public"."app_install_events" to "service_role";

grant references on table "public"."app_install_events" to "service_role";

grant select on table "public"."app_install_events" to "service_role";

grant trigger on table "public"."app_install_events" to "service_role";

grant truncate on table "public"."app_install_events" to "service_role";

grant update on table "public"."app_install_events" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."theme_device_installs" to "anon";

grant insert on table "public"."theme_device_installs" to "anon";

grant references on table "public"."theme_device_installs" to "anon";

grant select on table "public"."theme_device_installs" to "anon";

grant trigger on table "public"."theme_device_installs" to "anon";

grant truncate on table "public"."theme_device_installs" to "anon";

grant update on table "public"."theme_device_installs" to "anon";

grant delete on table "public"."theme_device_installs" to "authenticated";

grant insert on table "public"."theme_device_installs" to "authenticated";

grant references on table "public"."theme_device_installs" to "authenticated";

grant select on table "public"."theme_device_installs" to "authenticated";

grant trigger on table "public"."theme_device_installs" to "authenticated";

grant truncate on table "public"."theme_device_installs" to "authenticated";

grant update on table "public"."theme_device_installs" to "authenticated";

grant delete on table "public"."theme_device_installs" to "service_role";

grant insert on table "public"."theme_device_installs" to "service_role";

grant references on table "public"."theme_device_installs" to "service_role";

grant select on table "public"."theme_device_installs" to "service_role";

grant trigger on table "public"."theme_device_installs" to "service_role";

grant truncate on table "public"."theme_device_installs" to "service_role";

grant update on table "public"."theme_device_installs" to "service_role";

grant delete on table "public"."themes" to "anon";

grant insert on table "public"."themes" to "anon";

grant references on table "public"."themes" to "anon";

grant select on table "public"."themes" to "anon";

grant trigger on table "public"."themes" to "anon";

grant truncate on table "public"."themes" to "anon";

grant update on table "public"."themes" to "anon";

grant delete on table "public"."themes" to "authenticated";

grant insert on table "public"."themes" to "authenticated";

grant references on table "public"."themes" to "authenticated";

grant select on table "public"."themes" to "authenticated";

grant trigger on table "public"."themes" to "authenticated";

grant truncate on table "public"."themes" to "authenticated";

grant update on table "public"."themes" to "authenticated";

grant delete on table "public"."themes" to "service_role";

grant insert on table "public"."themes" to "service_role";

grant references on table "public"."themes" to "service_role";

grant select on table "public"."themes" to "service_role";

grant trigger on table "public"."themes" to "service_role";

grant truncate on table "public"."themes" to "service_role";

grant update on table "public"."themes" to "service_role";

grant delete on table "public"."unique_devices_installs" to "anon";

grant insert on table "public"."unique_devices_installs" to "anon";

grant references on table "public"."unique_devices_installs" to "anon";

grant select on table "public"."unique_devices_installs" to "anon";

grant trigger on table "public"."unique_devices_installs" to "anon";

grant truncate on table "public"."unique_devices_installs" to "anon";

grant update on table "public"."unique_devices_installs" to "anon";

grant delete on table "public"."unique_devices_installs" to "authenticated";

grant insert on table "public"."unique_devices_installs" to "authenticated";

grant references on table "public"."unique_devices_installs" to "authenticated";

grant select on table "public"."unique_devices_installs" to "authenticated";

grant trigger on table "public"."unique_devices_installs" to "authenticated";

grant truncate on table "public"."unique_devices_installs" to "authenticated";

grant update on table "public"."unique_devices_installs" to "authenticated";

grant delete on table "public"."unique_devices_installs" to "service_role";

grant insert on table "public"."unique_devices_installs" to "service_role";

grant references on table "public"."unique_devices_installs" to "service_role";

grant select on table "public"."unique_devices_installs" to "service_role";

grant trigger on table "public"."unique_devices_installs" to "service_role";

grant truncate on table "public"."unique_devices_installs" to "service_role";

grant update on table "public"."unique_devices_installs" to "service_role";


  create policy "Enable delete for users based on user_id"
  on "public"."profiles"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable insert for users based on user_id"
  on "public"."profiles"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable read access for all users"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "Policy with update table"
  on "public"."profiles"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable delete for users based on user_id"
  on "public"."themes"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = author));



  create policy "Enable insert for users based on user_id"
  on "public"."themes"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = author));



  create policy "Enable update for users based on user_id"
  on "public"."themes"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = author))
with check ((( SELECT auth.uid() AS uid) = author));



  create policy "read_theme"
  on "public"."themes"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER tr_on_theme_install_change AFTER INSERT OR DELETE ON public.theme_device_installs FOR EACH ROW EXECUTE FUNCTION public.update_theme_install_count();

CREATE TRIGGER on_auth_user_insert AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile_from_auth();


  create policy "Give anon users access to read profiles 1ige2ga_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'profiles'::text));



  create policy "Give users modify access to own folder 1ige2ga_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'profiles'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users modify access to own folder 1ige2ga_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'profiles'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users modify access to own folder 1ige2ga_2"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'profiles'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users modify access to own folder 1ige2ga_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'profiles'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Public_Read 13ktwja_0"
  on "storage"."objects"
  as permissive
  for select
  to anon
using ((bucket_id = 'theme_thumbnail'::text));



  create policy "Public_Read 1txnjgy_0"
  on "storage"."objects"
  as permissive
  for select
  to anon
using ((bucket_id = 'theme_preview'::text));



  create policy "User_Manage_Own_Folder 13ktwja_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'theme_thumbnail'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 13ktwja_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'theme_thumbnail'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 13ktwja_2"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'theme_thumbnail'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 13ktwja_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'theme_thumbnail'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 1txnjgy_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'theme_preview'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 1txnjgy_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'theme_preview'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 1txnjgy_2"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'theme_preview'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



  create policy "User_Manage_Own_Folder 1txnjgy_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'theme_preview'::text) AND (auth.role() = 'authenticated'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



