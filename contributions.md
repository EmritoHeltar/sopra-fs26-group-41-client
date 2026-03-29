# Contributions

Every member has to complete at least 2 meaningful tasks per week, where a
single development task should have a granularity of 0.5-1 day. The completed
tasks have to be shown in the weekly TA meetings. You have one "Joker" to miss
one weekly TA meeting and another "Joker" to once skip continuous progress over
the remaining weeks of the course. Please note that you cannot make up for
"missed" continuous progress, but you can "work ahead" by completing twice the
amount of work in one week to skip progress on a subsequent week without using
your "Joker". Please communicate your planning **ahead of time**.

Note: If a team member fails to show continuous progress after using their
Joker, they will individually fail the overall course (unless there is a valid
reason).

**You MUST**:

- Have two meaningful contributions per week.

**You CAN**:

- Have more than one commit per contribution.
- Have more than two contributions per week.
- Link issues to contributions descriptions for better traceability.

**You CANNOT**:

- Link the same commit more than once.
- Use a commit authored by another GitHub user.

---

## Contributions Week 1 - [23.03.2026] to [29.03.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@fly-die** | 25.03.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/d3e57c410bf6a1ddf408fd714086f42d53316602]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/878220523cc16e151a1ed074492a17090c911cc2]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/33df94b0119d760801f60ce9ce85ba89c17f2b19]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/906df0ba680344c482a5d5ae42f4d4f53a8142c0] | Implemented bearer token handling in API service and integrated it into login flow (#4) | Required for authenticated endpoints like /users/me to work correctly. Commits appear aligned in time due to history rewrite (had to change author to match github username)|
| **@fly-die** | 28.03.2026  | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/0244a507b1ede980d3220f27ae61e34fb88154d5]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/e25b1e169b8a198128b2bdd8e4c9e478df91dfa0]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/ce66f61ad90578f13bfc3241a6b5173b2075cf0d]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/1e5180d5eecd342a7c70dab74a6b759c0f768350]| Implemented the Homepage /users/me. Fetches all user data and displays it in a nice dashboard view (#3) | This is the core page of our application. Here he can update his data, look at stats and view other things. Later on the group creation button, search bar, data upload and group view will also be integrated into this page.  |
| **@fabianbaechli** | 26.03.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/64e7a29115f732165611abe4893c435d72f35815] | Implemented registration #18 and authentication #19 | Introduces authentication flow for project. Added `/register`, `/login` and `/logout` routes according to API spec. Passwords are hashed with `BCrypt`, authentication tokens are invalidated for session handling. Updated user model so login state is tracked. |
| **@fabianbaechli** | 26.03.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/0844e3a7e896c576119edbba1cbb5f43799489fc]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/7243671c6176348752c317ccbe1a9ec581e65771]| Upload and unzipping of letterboxd data #24 | Added `/import` route which takes a zip file as form datat. Data is unzipped in backend and verified. |
| **@fabianbaechli** | 27.03.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/8f67cc2666bd81bab2cbdc85b40dcfb65aeab1d8]|Persisting of letterboxd data #25 | Completes the main import logic by parsing `ratings.csv`, converting it into rated-movie data, and persisting it as part of each user’s taste profile. Added `RatedMovie` and `TasteProfile` entities. Response contains summary of taste profile for user. |
| **BB8006** | [27.03.2026]   | [[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/b62ab550ee4d43f758bf713ce7245bdb6e961058] | Changed app page.tsx logic to redirect correctly (#1)| Correct redirection of the user so that if a token already exists the user will be redirected to the users/me page automatically or if not the user has to loging by being redirected to the login page |
| **BB8006** | [28.03.2026]   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/65dddcad666d1f3f8acc86b0a81491b67ed91d3e)] | Implemented login page UI and authentification logic (#1) | Added the login screen UI and connected it to the /login endpoint. It now handles loading states and displays server errors directly on the form |
| **BB8006** | [28.03.2026]   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/2cd66be4805bc297781ce54e9aabb9bf4e665142] , [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/26079d45eb9ec590f51c5da68da96592e321027f] | implemented register page UI/API logic and extracted styles from css module (#2) | Built the Register page (Issue #2) so users can actually create accounts, extracted our styling into a clean CSS module to avoid duplicate code, and fixed an Ant Design warning that was breaking the dev screen. |
| **EmritoHeltar** | [28.3.2026]   | [(https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/78f6b1057ac4a85e14cf7386d89d839fc33ff3d2)] | Implemented the Users/me endpoint | This allows the frontend to start populating the profilepage of the user |
| **EmritoHeltar** | [28.3.2026]   | [(https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/b11825abb281e1fc86e3287832bc33622238af4c)] | I advanced the TasteProfile class | This is vital to then start coding the recommendation algorithm. I also added the capability to merge multiple tasteprofiles so groups can have a tasteprofile. Reagarding the commit message after communicating the class is good as it is now |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 2 - [Begin Date] to [End Date]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **[@githubUser1]** | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **[@githubUser2]** | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **[@githubUser3]** | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **[@githubUser4]** | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 3 - [Begin Date] to [End Date]

_Continue with the same table format as above._

---

## Contributions Week 4 - [Begin Date] to [End Date]

_Continue with the same table format as above._

---

## Contributions Week 5 - [Begin Date] to [End Date]

_Continue with the same table format as above._

---

## Contributions Week 6 - [Begin Date] to [End Date]

_Continue with the same table format as above._
