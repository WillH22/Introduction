# WeTrip: Your Boating Trip Planner

Introducing **WeTrip**, a platform designed to assist boaters in planning their voyages. This platform encompasses two key features:

1. **Weather Application:** Displaying the current day's weather prominently atop each page, along with a 16-day weather forecast.

2. **Trip Planner:** Compiling an exhaustive list of on-water points of interest, conveniently located near the user's current position or a destination of their choosing. Users can explore these points of interest, assign ratings (if logged in), and create seamless trips from one point to another. The platform records the trip's route, distance, and archives it in the database, facilitating both viewing and rating by its originator.

**Universal Weather Access:** WeTrip ensures universal access to its weather functionalities for all users. Unregistered users have the privilege to peruse points of interest and recently saved trips contributed by fellow users. However, to personalize, save your own trips, or rate points of interest and trips, registration and login are prerequisites.

**Enhanced User Experience:** To augment user experience, WeTrip employs local storage to retain a user's selected location (unless it matches their registered location) and the trajectory of an ongoing trip initiated by a logged-in user but yet to be saved in the database.

**Testing:** Test files are neatly arranged within the **tests** folder. You can initiate tests with the command `npm test`.

**API Integration:** WeTrip harnesses the power of multiple APIs. Weather-related data originates from the _weatherbit.io API_, while _marinas.com API_ furnishes points of interest. For visualizing points of interest on maps and calculating distances, WeTrip integrates _React-mapbox-gl_ in tandem with _mapbox-gl-js_.

**Tech Stack:**

- **Frontend:** The frontend of WeTrip is built using **Create React App**, offering a modern and efficient framework for developing user interfaces.
- **Backend:** The backend of WeTrip is powered by **Node.js**, providing a robust and scalable runtime environment for server-side applications.

**Backend Database:** Moreover, a dedicated WeTrip-backend database houses all backend information. This database encompasses various tables, including:

- **Users:** Housing user credentials, location, and preferred units of measurement.
- **Locations:** Containing the names and latitude/longitude of points of interest featured in saved trips or rated by users.
- **Location Ratings:** Storing each location rating and the corresponding user.
- **Trips:** Capturing trip names and distances.
- **Trip Locations:** Housing location IDs, trip associations, and display orders within trips.
- **User Trips:** Comprising trip IDs, creators' information, and user-assigned ratings.

The WeTrip backend infrastructure is meticulously designed to accommodate the diverse needs of your maritime excursions.
