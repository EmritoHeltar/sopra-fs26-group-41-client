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

---

## Contributions Week 2 - [30.03.2026] to [05.04.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@fly-die** | 01.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/ad243f3d2ce397efeb4a4a1637462a465dd1141d] | Implemented search bar UI on /users/me (#8) | Adds input and integrates search bar into homepage layout according to mockup, no backend interaction yet |
| **@fly-die** | 01.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/085b656cb512869c1d55c14843a39a4861b49be3]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/bcb2e75987b9936f1e0a7c02838566d8e8b608be]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/110cc5c90b2972eb923c92fa4e45235f176f2b4e]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/2584f8050b09f079da77be0dbbb02fed88367b12]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/4f159ae631497f163290592e6000ca0a659c75f0]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/52fd90b9e33e3fa11ca80c1f48e52418d0c27f92]| Various bug fixes in frontend & backend (#2, #3 & more) | Bug fixes, minor adjustments. May not count as a contribution but added for completeness/consistency. |
| **@fly-die** | 02.04.2026 & 04.04.2026 | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/1aaa3de158e9a045ec2e3979a503c3666feba8c8]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/d816f63f782d1bc7561155c1a6242c3fdb15e1bf]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/e7ccec7a86f2fd900946adf6af81287472800a1b]| Data upload, sending it to backend and error handling (#6 & #7) | Implemented frontend logic to upload Letterboxd export data to the backend (/import) and added loading and error handling to provide user feedback and allow retry on failure. |
| **EmritoHeltar** | 03.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/ad0f619a103bc81e782abb7b6b4eee0bc942de6b] | [I had the write the basic boilerplate for group andalso create the corresponding service and controller files. ] | [My code makes it possible to jojn a group via a link if one is logged in on their device] |
| **EmritoHeltar** | 03.04.2026   | [(https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/c3f9533f83ed57f0e5f98b07d12959b8a8c976a4)] | [I added a few lines of code in the controller and the groupservice and added one new DTO file. So users are able to leave groups] | [This is what is needed so a user can leave a group] |
| **@fabianbaechli** | 02.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/4ddef1928e258956513f5737ab3dd80fad5e14a3] | Implemented `#30` (Handling of movie queries via OMDb API) | Introduces communication with external API. Allows searching for movies via query string and returns them in the specified way. |
| **@fabianbaechli** | 03.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-server/commit/8a09f33733d7ece020602bfff9c083600c8d88c0] | Implemented `#31` (Serve movie details) | Allows querying all relevant details about a movie. Used when clicking on a search result and later on when polling. |
| **[@BB8006]** | 04.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/6ae3eafaeda66835d68887665987bede44068754]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/6ba37612c4fd1b635ab6bd8cfd9c78d64dc20c9b]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/190a46d1229990e1891f33a123493fb684898b29]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/f1d04b689b333bde4090f651761b378221e05d0f]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/d54e1000ac067a49255f3272edd0c26a5221a04b] | Letterboxd ZIP import modal, backend upload logic and error handling (#5) | This contribution implements the client-side interface for the Letterboxd ZIP import. It lets users find and submit their exported data to the backend, which is a structural requirement to generate the taste profiles and statistics later on. |
| **@BB8006** | 04.04.2026   | [https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/f74fd36492d4b8c26b7680c5b1d7edf1b85a6fb2]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/31f6b856ef9775796cfdb1231ec765c7862165e5]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/b15194c437fecb657d6240a98a2d1a4ab9811aa2]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/681262e55ca358edf990c8203f4ee08fb7f909a3]<br>[https://github.com/fabianbaechli/sopra-fs26-group-41-client/commit/27bb293f55cd3759ff0287122e15c2b709851b5d] | Implemented movie search results flow on the frontend for issue (#9). | This contribution connects the home-screen search bar to the backend movie query API and lets users view and open matching movie results, which is a core navigation and discovery feature of Movieblendr.|

---

## Contributions Week 3 - [06.04.2026] to [12.04.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 4 - [13.04.2026] to [19.04.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 5 - [20.04.2026] to [26.04.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 6 - [27.04.2026] to [03.05.2026]

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username1** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username2** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username3** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **@username4** | [date] | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

