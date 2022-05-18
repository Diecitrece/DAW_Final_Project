# Components

In our components folder we have

- Navigation Bars
    - Public navigation bar
        - With buttons to…
            - Navigate to the main page
            - Navigate to your profile
            - Navigate to your reviews
            - Navigate to your requests
            - Search books
            - Request a book
                - Which toggles the request modal
            - Go to the admin panel (only if you are an admin)
            - Log out
    - Admin navigation bar
        - With buttons to…
            - Admin panel main page
            - Users administration page
            - Books administration page
            - Requests admin page
            - Roles admin page
            - Reports admin page
- Modals
    - Report review
        - Modal that shows a form to report a review
    - Request a book
        - Modal that shows a form to request a book
    - Add review
        - Modal that shows a form to create a new review
    
- Logger
    
    Here we created a logger using Winston extension to create custom logs of each request made by our users.