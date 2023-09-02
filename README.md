# Ratings and Reviews API Service
- Design and optimization of a backend system to a set of microservices for an e-commerce web application.
- Responsible for the Ratings & Reviews API that supports the frontend Reviews module which allows users to view and search reviews, add reviews, like or report reviews.



# Tech Stack:<br>
<a href="">![-Node](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)</a>
<a href="">![-Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)</a>
<a href="">![-Postgresql](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)</a>
<a href="">![-Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white)</a>
<a href="">![-Nginx](https://img.shields.io/static/v1?style=for-the-badge&message=NGINX&color=009639&logo=NGINX&logoColor=FFFFFF&label=)</a>
<a href="">![-Redis](https://img.shields.io/static/v1?style=for-the-badge&message=Redis&color=DC382D&logo=Redis&logoColor=FFFFFF&label=)</a>


## API Endpoints <br>

### Reviews <br>
**GET** `/reviews` retrieves a list of (non-reported) reviews for a particular product<br>
**GET** `/reviews/meta` returns a review metadata for a given product<br>
**POST** `/reviews` add a review for a given product<br>
**PUT** `/reviews/review_id/report` updates a review to show it was reported<br>
**PUT** `/reviews/review_id/helpful` update a review to show it was found helpful<br>



## Performance Summary & Stress Testing
| Metric | Goal | Achieved |
| --- | --- | --- |
| RPS | 1000 | 1000|
| Latency | <1s | 66ms|
| Error rate | <1% | <1%|


