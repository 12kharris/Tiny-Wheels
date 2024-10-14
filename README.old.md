
# Tiny Wheels React.js Front-End
Tiny wheels is a website where users can view posts and diecast vehicle collections of other users. The site is aimed at diecast vehicle enthusiasts who wish to share their enjoyment of the hobby with others. This half of the project is the front end, user facing website. The site allows anyone to view posts made by other users, see a user's profile and see a user's collection. Logged in users can create posts, like posts and comment n posts. They can also add items to their vehicle collections and follow other user's profiles.

The live site can be found at https://tiny-wheels-1dcc9b8480fe.herokuapp.com/

## Technologies Used
The following technologies were used:
- Node.js - Used to run the Javascript application
- React.js - Used as the framework on which the application was built
- React-bootstrap - Used for styling and structuring the various pages
- Axios - Used for handling API requests and responses

## Languages Used
The following programming languages were used for this project
- HTML - For web page content structure
- CSS - For web page content styling
- Javascript - For routing and logic, handling user inputs and maniupulation of the app's state
- JSX - For displaying of content. JSX allows for mixing Javascript and HTML into one for dynamic page rendering
- Font Awesome - For small icons. Used primarily in the NavBar and Post components
- Google Fonts - For providing more font choices

## Acknowledgements
All code which has been adapted from online sources has been commented within the file where the code has been used.
- The Code Institute Moments walkthrough was a big influence on this project. The main code that was used from this walkthrough were the following: Creating Axios defaults and interceptors for requests, handling refreshing of tokens in the CurrentUserContext.js file, uploading images through forms and displaying error messages from invalid form fields.


## Planning
Before development, planning of the look of the application and the key pages was done to streamline development. The main pages which required planning were pages containing posts and the collection page. The simple wireframes for these are shown below:

![Posts](https://res.cloudinary.com/da2ant1dk/image/upload/v1728850581/media/images/oeu9mchftuclszjo6mrj.png)
![Collection](https://res.cloudinary.com/da2ant1dk/image/upload/v1728850580/media/images/pclavllqtljtl0gxnrte.png)


### User Stories
The development process was broken down into sprints containing various user tasks. This was originally done on Azure DevOps but was switched to GitHub projects midway through development. Below are links to both boards. Each work item is associated to a sprint/iteration.

https://github.com/users/12kharris/projects/4
https://dev.azure.com/kurtharris1541/Tiny%20Wheels/_workitems/recentlyupdated 


## Features
This section outlines the various features of the Tiny Wheels application. 

### Account Registration
The site allows users to register a new profile through the sign up page. The sign up page contains a simple form. Once a new profile has been registered, the user is redirected to the sign in page to log in with thir new profile. 

![Sign up](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929292/sign_up_dgw2eq.png)

### Persistent sign in status
Once a user is logged in, if they revisit the app their sign in status will be remembered. This is achieved by keeping the access refresh token and using this to retrieve a new access token. 

### Navigation
Every page on the app features the NavBar component. This can show different icons depending on the logged in status of the user. If a user is not logged in, they will have access to the 'new' and 'popular' pages as well as the ability to sign in or out using the navbar. If a user is logged in, they will have the following links in the nav bar: New, Popular, Add Post, Following, Your Collection, Profile and Sign out.

![logged out](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929284/logged_out_nav_gxo2e7.png)
![logged in](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929284/logged_in_nav_l6h2tw.png)

### New Page
The new page shows all posts from all users from newest to oldest. On this page, a user can use the search bar to search posts to tailor their feed. They can also click on one of the Tag options which will filter the posts, showing only the ones with the desired tag. The searchbar is cleared and disabled when a tag is being filtered on.

![new page](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929286/new_page_g2z6x6.png)

### Popular page
The popular page shows all posts from all users in order of the most liked posts. Using this view, a user can see what is popular on the site.

### Post Component
A post contains the following: the profile who created the post, the title, the caption, the image, a like count, a like icon, a dislike count, a dislike icon, a comment count and a comment icon. When a user is logged in they can use the like icon to like and slike a post. If a user has liked or disliked a post, the icon will be filled in. The profile icon is a link which will take you to the profile page of the owning user. The image is a link and when clicked will take you to a detailed view of the post. The comment icon will also take you to the post's detail view.

### Post detail
The post detail view shows the post again but also lists the comments on the post beneath the post. This was separated out so that the main posts pages would not become cluttered in this version of the app. 

### Add post
A logged in user to use the Add Post link to create a new post. This page contains a simple form to fill out to create the post.

![Add post](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929284/add_post_ggebbr.png)

### Edit post
A user who owns a post has the ability to edit the post. This is provided in a dropdown that only appears on a post the user owns. When the edit option is clicked, the user is taken to a page where they can edit a form and click save to edit the post.

### Like or dislike a post
Logged in users can like and dislike posts. They use the like and dilike icons on a post to do this. A user can like or dislike a post when the following criteria are met: They do not own the post, they are logged in, they have not liked or disliked the post already. If a user has liked or disliked the post, they can click the respective icon to unlike or undislike the post. If a user tries to like a dislike a post they own, an overlay message appears indicating why they are unable to do so.

![likes](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929284/likes_and_comments_f7zgzk.png)

### Comment
Any logged in user can comment on any post. This is done in the post detail view. There is an 'Add comment' button which, when clicked, will display a form in the comments section to add a new comment. A logged in user who owns a comment can also edit or delete a comment with a dropdown button that appears when a user sees a comment they own. Whe a user clicks to edit the comment, the form is displayed again where they can save their changes.

![comment](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929284/comment_j6ndgo.png)

### Following
Logged in users can follow each other. When a user follows another, their content will appear on the 'Following' page. A user can also view who they are following from a link on the profile page which will take them to a simple page which lists all of the profiles the user is following. A user can also see profiles who follow them with a similar link on the profile page. To follow a profile, a user can use the button present on the Profile page to follow and unfollow the profile.

### Profile Page
The profile page shows the details of a specific profile. It shows the profile's username, their name (if they have provided one), when they signed up, a link to see their collection, how many users they follow and how many users follow them. If a user is viewing the profile they own, an edit button is present where they can edit their profile image and name. Below the details of the profile, any posts the profile has made will be listed.

![profile](https://res.cloudinary.com/da2ant1dk/image/upload/v1728929292/profile_page_atdnbw.png)

### Collections
Each profile has a collection. The collection is where a user can list all of the models they own. They can add an item through a button that appears if the user is viewing their own collection. A collection item contains the following pieces of info: the brand of the model, the series of the model, an image of the model, then name of the model and the quantity that the user owns. The collection items are displayed in a grid. If a user owns the collection item, they can click on it to edit its details. This is done through another simple form.

![collection page](https://res.cloudinary.com/da2ant1dk/image/upload/v1728931987/collection_page_pot7a0.png)


### Tags
When a user creates a post, they can choose to add a tag to the post which others can use to filter for on the 'New' page.

### Signing Out
A logged in user can choose to sign out using the provided nav bar icon. When this is done, the user is logged out and they are returned to the 'New' page.


## Testing
The scenarios were tested to ensure the application is secure and functions as expected.
### Logged out user cannot create a post
When not logged in, attempting to navigate to the addpost page returns the NotExists component instead of the form to add a post. This is a PASS.

### Logged out user cannot like or dislike a post
When not logged in, the buttons to like or dislike a post are disabled and the user cannot perform these actions. This is a PASS

### Logged out user cannot comment
When logged out, the button to add a comment is not present so a user cannot perform this action. This is a PASS.

### Logged out user cannot go to the following/followers pages
When logged out, if the user navigates to the following page or a followers page, the NotExists component is returned instead of the usual page content. This is a PASS.

### Logged in user cannot edit a profile they don't own
If a logged in user attempts to navigate to the edit page of a profile they don't own, the NotExists component is returned instead of the usual page content. This is a PASS.

### Logged in user cannot edit a comment they don't own
When logged in, if a user sees a comment they don't own, the button to edit a comment is not present so the user cannot perform this action. This is a PASS.

### Logged in user cannot edit a collection item they don't own
When logged in, if a user attempts to navigate to the edit page of a collection item they don't own, the NotExists component is returned instead of the usual page content. This is a PASS.

### Logged in user cannot edit a post they don't own
When logged in, if a user attempts to navigate to the edit page of a post they don't own, the NotExists component is returned instead of the usual page content. This is a PASS.


### Responsive Testing
The website was viewed on a large, medium and small screen to assess the usability of the site on all devices. Below are a variety of screenshots with the results. The site is functional on all devices.

![large](https://res.cloudinary.com/da2ant1dk/image/upload/v1728932192/large_fvgrqu.png)
![medium](https://res.cloudinary.com/da2ant1dk/image/upload/v1728932192/medium_pm9u1l.png)
![small](https://res.cloudinary.com/da2ant1dk/image/upload/v1728932192/small_onmcet.png)


## Deployment
Below are the steps that were taken to deploy the application to Heroku:
- Add a Procfile with the command web: serve -s build
- Create a new app on Heroku
- Link the GitHub repo
- Git commit and push all changes
- Deploy the branch

## Code Validation
### HTML
Using W3C

### CSS



### Javascript
Using JSHint

## Known Issues


## Problems encountered
- The tag was designed to be optional and can be blank in the database. However when submitting the form, an absent tag on post creation kept being turned into an empty string which was failing the post request. To get around this, new tag of "No tag" has been made and logic around it so it won't display. 

- For one post, a like or dislike would add 2 to the count. I was unable to replicate this locally. The post was deleted and all posts since have not had this issue.

## Future Features
Below are features which I would like to add to the application in the future.
- Viewing liked posts on the profile page: The API functionality exists to see posts you ahve liked. There is no view for this currently and could be added.
- Private profiles: Allow a user to mark their profile as private where only users who follow them can see their posts. This would require some work creating follow requests.
- Add loading symbols: There currently isn't any state shown when we are awaiting an API response. A loading symbol could be added in this case
- Comment chains: Adding replies to comments possibly by using a ParentCommentID on a comment for handling replies
- Private messaging: An ability to message a profile would be useful
- Having a preset list of models: being able to search for a model when adding a collection item and it will prefill the form if a match is found. This could also help restrict what can be uploaded to a collection as currently someone could upload anything as a collection item.