--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: assignment
--

COPY public.users (id, username, "createdAt") FROM stdin;
1	quan0401	2024-10-17 07:16:16.053+00
\.


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: assignment
--

COPY public.photos (id, url, description, "createdAt", "userId") FROM stdin;
2	http://res.cloudinary.com/dg3fsapzu/image/upload/v1729149428/social/1.jpg	cute dog	2024-10-17 07:16:15.989+00	1
3	http://res.cloudinary.com/dg3fsapzu/image/upload/v1729149462/social/1.jpg	what	2024-10-17 07:17:22.518+00	1
4	http://res.cloudinary.com/dg3fsapzu/image/upload/v1729149487/social/1.jpg	cat	2024-10-17 07:17:21.866+00	1
5	http://res.cloudinary.com/dg3fsapzu/image/upload/v1729149523/social/1.jpg	meme dog	2024-10-17 07:17:22.518+00	1
6	http://res.cloudinary.com/dg3fsapzu/image/upload/v1729149539/social/1.svg	no	2024-10-17 07:17:21.866+00	1
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: assignment
--

COPY public.comments (id, text, "createdAt", "userId", "photoId") FROM stdin;
1	this dog is so cute	2024-10-17 07:17:22.331+00	1	2
2	cute cat	2024-10-17 07:17:22.331+00	1	4
3	second comment	2024-10-17 07:17:22.613+00	1	2
4	hi	2024-10-17 07:17:21.873+00	1	2
5	third	2024-10-17 07:17:21.873+00	1	2
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: assignment
--

SELECT pg_catalog.setval('public.comments_id_seq', 5, true);


--
-- Name: photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: assignment
--

SELECT pg_catalog.setval('public.photos_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: assignment
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

