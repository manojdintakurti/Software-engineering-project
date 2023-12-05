
# Project: Caring Plates - Bridging Restaurants and NGOs for Food Waste Management
# Introduction
"Caring Plates" is a revolutionary application developed as part of the Software Engineering coursework at Virginia Tech. This innovative platform serves as a bridge connecting restaurant owners with NGOs, aiming to combat food waste and contribute to helping those in need.

# Unit Test Cases:
We have meticulously crafted comprehensive test cases for all controllers and service classes, ensuring a thorough examination of our application's functionality. Our commitment to quality is reflected in the excellent code coverage achieved, as verified by SonarQube.

# Acceptance Criteria:
1. **User Registration**:
   Upon providing all necessary details and clicking "register," users receive a success confirmation and are seamlessly directed to the login page.
2. **Login**:
   (i) Successful entry of correct email and password leads to navigation to the homepage.
   (ii) Incorrect login details trigger an error message, alerting users about invalid credentials.
3. **Claim Post**:
   When an NGO user claims a food post, a pop-up notifies successful claim completion.
   Email notifications are sent to both the user and the restaurant owner, providing restaurant details and Google Maps location to the user and NGO details to the restaurant owner.
4. **Create a Post**:
   Exclusive to restaurant-type users.
   (i) If the profile is set up, users are directed to the create a post page.
   (ii) If the restaurant profile is already established, users are directly navigated to the create a post page.
5. **Post Creation**:
   Upon entering all food post details, users receive a confirmation message and remain on the same page.
   (ii) The homepage dynamically updates to display the newly created post.
6. **Homepage Visibility**:
   Only posts with a future "best before" date are visible on the homepage, ensuring relevance and usability.

## **Conclusion**

   "Caring Plates" emerges as a robust solution, leveraging technology to facilitate meaningful connections between restaurants and NGOs. This project not only addresses food waste but also fosters a sense of community and compassion, contributing to a more caring and sustainable society.





