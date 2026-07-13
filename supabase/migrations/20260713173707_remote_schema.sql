create extension if not exists "vector" with schema "public";


  create table "public"."doc_chunk" (
    "id" uuid not null default gen_random_uuid(),
    "document_id" uuid not null,
    "section" text not null,
    "content" character varying(2000) not null,
    "embedding" public.vector(1536)
      );


alter table "public"."doc_chunk" enable row level security;


  create table "public"."document" (
    "id" uuid not null default gen_random_uuid(),
    "path" text not null,
    "title" text
      );


alter table "public"."document" enable row level security;

CREATE INDEX doc_chunk_document_id_idx ON public.doc_chunk USING btree (document_id);

CREATE INDEX doc_chunk_embedding_idx ON public.doc_chunk USING hnsw (embedding public.vector_cosine_ops);

CREATE UNIQUE INDEX doc_chunk_pkey ON public.doc_chunk USING btree (id);

CREATE UNIQUE INDEX document_pkey ON public.document USING btree (id);

alter table "public"."doc_chunk" add constraint "doc_chunk_pkey" PRIMARY KEY using index "doc_chunk_pkey";

alter table "public"."document" add constraint "document_pkey" PRIMARY KEY using index "document_pkey";

alter table "public"."doc_chunk" add constraint "doc_chunk_document_id_fkey" FOREIGN KEY (document_id) REFERENCES public.document(id) not valid;

alter table "public"."doc_chunk" validate constraint "doc_chunk_document_id_fkey";

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

grant delete on table "public"."doc_chunk" to "anon";

grant insert on table "public"."doc_chunk" to "anon";

grant references on table "public"."doc_chunk" to "anon";

grant select on table "public"."doc_chunk" to "anon";

grant trigger on table "public"."doc_chunk" to "anon";

grant truncate on table "public"."doc_chunk" to "anon";

grant update on table "public"."doc_chunk" to "anon";

grant delete on table "public"."doc_chunk" to "authenticated";

grant insert on table "public"."doc_chunk" to "authenticated";

grant references on table "public"."doc_chunk" to "authenticated";

grant select on table "public"."doc_chunk" to "authenticated";

grant trigger on table "public"."doc_chunk" to "authenticated";

grant truncate on table "public"."doc_chunk" to "authenticated";

grant update on table "public"."doc_chunk" to "authenticated";

grant delete on table "public"."doc_chunk" to "service_role";

grant insert on table "public"."doc_chunk" to "service_role";

grant references on table "public"."doc_chunk" to "service_role";

grant select on table "public"."doc_chunk" to "service_role";

grant trigger on table "public"."doc_chunk" to "service_role";

grant truncate on table "public"."doc_chunk" to "service_role";

grant update on table "public"."doc_chunk" to "service_role";

grant delete on table "public"."document" to "anon";

grant insert on table "public"."document" to "anon";

grant references on table "public"."document" to "anon";

grant select on table "public"."document" to "anon";

grant trigger on table "public"."document" to "anon";

grant truncate on table "public"."document" to "anon";

grant update on table "public"."document" to "anon";

grant delete on table "public"."document" to "authenticated";

grant insert on table "public"."document" to "authenticated";

grant references on table "public"."document" to "authenticated";

grant select on table "public"."document" to "authenticated";

grant trigger on table "public"."document" to "authenticated";

grant truncate on table "public"."document" to "authenticated";

grant update on table "public"."document" to "authenticated";

grant delete on table "public"."document" to "service_role";

grant insert on table "public"."document" to "service_role";

grant references on table "public"."document" to "service_role";

grant select on table "public"."document" to "service_role";

grant trigger on table "public"."document" to "service_role";

grant truncate on table "public"."document" to "service_role";

grant update on table "public"."document" to "service_role";


  create policy "Enable read access for all users"
  on "public"."doc_chunk"
  as permissive
  for select
  to service_role
using (true);



  create policy "Policy with table joins"
  on "public"."doc_chunk"
  as permissive
  for update
  to service_role
using (true);



  create policy "write_doc_chunk"
  on "public"."doc_chunk"
  as permissive
  for insert
  to service_role
with check (true);



  create policy "insert_docs"
  on "public"."document"
  as permissive
  for insert
  to service_role
with check (true);



  create policy "read_docs"
  on "public"."document"
  as permissive
  for select
  to service_role
using (true);



  create policy "update_docs"
  on "public"."document"
  as permissive
  for update
  to service_role
using (true);



