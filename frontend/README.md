# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## MERN app for chat application

In this section of the app we have added following things

1. Setup basic file upload using [Cloudinary API](https://cloudinary.com/).
2. We need to login / sign up first
3. In order to setup we need to navigate to settings -> upload -> and looking for `Upload presets: ` section -> Click on `Add upload preset`
4. Add new preset name (we need to use that preset in our code implementation). change sign mode to unsigned.
5. Now navigate to dashboard, in Account settings all the required details available.
6. Few important URL
   Base delivery url - http://res.coludinary.com/<Cloud Name>
   Secure delivery url - https://res.coludinary.com/<Cloud Name>
   API base url - https://api.coludinary.com/v1_1/<Cloud Name>
   cloudname will be available in dashboard section
7. For upload image we have documentation https://cloudinary.com/documentation/image_upload_api_reference
8. Now in sign up component we have setup the image posing functionality
