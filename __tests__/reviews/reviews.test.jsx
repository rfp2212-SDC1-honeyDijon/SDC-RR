/* eslint-disable no-await-in-loop */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Ratings from '../../client/src/components/Ratings/Ratings.jsx';
import TrackerBar from '../../client/src/components/Ratings/sub-components/TrackerBar.jsx';
import ActiveFilters from '../../client/src/components/Ratings/sub-components/ActiveFilters.jsx';
import ReviewImageModal from '../../client/src/components/Ratings/sub-components/ReviewImageModal.jsx';
import DashboardCharacteristicTracker from '../../client/src/components/Ratings/sub-components/DashboardCharacteristicTracker.jsx';
import ReviewSearchBar from '../../client/src/components/Ratings/sub-components/ReviewSearchBar.jsx';
import ReviewModalStar from '../../client/src/components/Ratings/sub-components/ReviewModalStar.jsx';
import ReviewModalStars from '../../client/src/components/Ratings/sub-components/ReviewModalStars.jsx';
import ReviewDashboard from '../../client/src/components/Ratings/sub-components/ReviewDashboard.jsx';
import ModalCharRadioBtns from '../../client/src/components/Ratings/sub-components/ModalCharRadioBtns.jsx';
import ReviewTile from '../../client/src/components/Ratings/sub-components/ReviewTile.jsx';
import SubmitReview from '../../client/src/components/Ratings/sub-components/SubmitReview.jsx';
import UploadAndDisplayImage from '../../client/src/components/Ratings/sub-components/UploadImageModal.jsx';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

const proxyReviewMetaData = {
  product_id: '40767',
  ratings: {
    1: '1',
    3: '3',
    4: '6',
    5: '2',
  },
  recommended: {
    false: '1',
    true: '11',
  },
  characteristics: {
    Fit: {
      id: 136629,
      value: '3.5833333333333333',
    },
    Length: {
      id: 136630,
      value: '3.6666666666666667',
    },
    Comfort: {
      id: 136631,
      value: '3.1666666666666667',
    },
    Quality: {
      id: 136632,
      value: '3.0833333333333333',
    },
  },
};
const proxyCharName = 'Size';
const proxyReviewData = [{
  product: '40767',
  page: 0,
  count: 5,
  results: [
    {
      review_id: 651449,
      rating: 5,
      summary: 'Excepturi vitae fugit quasi culpa eum debitis.',
      recommend: true,
      response: null,
      body: 'Reiciendis et molestias et rerum. Et eos suscipit dolorum ea nemo ad iure atque id. Tenetur officiis qui tempora dignissimos in odio fugiat inventore velit. Facere totam facere incidunt. Architecto earum aut dolorum.',
      date: '2021-02-25T00:00:00.000Z',
      reviewer_name: 'Kasandra.Kuphal7',
      helpfulness: 28,
      photos: [
        {
          id: 1223697,
          url: 'https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        },
      ],
    },
    {
      review_id: 651448,
      rating: 4,
      summary: 'Tempore ipsa officiis laudantium enim rerum delectus quo tenetur.',
      recommend: true,
      response: '"Ad eos illum iusto aut vitae."',
      body: 'Non architecto optio et architecto eos dolore. Veniam rerum non sunt commodi minus consequatur eaque qui. Natus nostrum aut beatae nam.',
      date: '2021-04-15T00:00:00.000Z',
      reviewer_name: 'Nakia_Boyle98',
      helpfulness: 27,
      photos: [
        {
          id: 1223698,
          url: 'https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
      ],
    },
    {
      review_id: 651446,
      rating: 4,
      summary: 'Culpa minima est ratione et consequuntur.',
      recommend: true,
      response: null,
      body: 'Minima est ipsa sit sunt. Perferendis omnis quasi repellendus velit voluptatibus sit illo aut. Et dolore deserunt exercitationem harum ad maiores ex ducimus. Ut ut qui aspernatur placeat vel molestiae reprehenderit ipsam eveniet. Et voluptatibus in incidunt.',
      date: '2020-09-05T00:00:00.000Z',
      reviewer_name: 'Armani_Walsh',
      helpfulness: 11,
      photos: [
        {
          id: 1223702,
          url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        },
        {
          id: 1223703,
          url: 'https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
        {
          id: 1223704,
          url: 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        },
      ],
    },
    {
      review_id: 651450,
      rating: 4,
      summary: 'Consequatur dignissimos voluptatem doloribus et nisi.',
      recommend: true,
      response: '"Praesentium est sed dolores saepe."',
      body: 'Nemo inventore asperiores ut ex exercitationem omnis aspernatur suscipit velit. Illum quia cum reiciendis dolor architecto est. Est praesentium quas adipisci. Reiciendis odit optio consequatur et sapiente est voluptatum quam.',
      date: '2021-07-19T00:00:00.000Z',
      reviewer_name: 'Armani12',
      helpfulness: 8,
      photos: [
        {
          id: 1223694,
          url: 'https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
        {
          id: 1223695,
          url: 'https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80',
        },
        {
          id: 1223696,
          url: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
      ],
    },
    {
      review_id: 651447,
      rating: 3,
      summary: 'Tempora dolorem quia possimus molestiae.',
      recommend: true,
      response: null,
      body: 'Suscipit non et omnis dolor ut. Velit ut quibusdam nobis quam. Qui officiis dolor hic mollitia quasi. Voluptatem qui dolor facilis officia incidunt. Soluta tenetur ut aspernatur delectus consequuntur eum. Repellat velit aut.',
      date: '2020-09-30T00:00:00.000Z',
      reviewer_name: 'Hobart.Davis74',
      helpfulness: 0,
      photos: [
        {
          id: 1223699,
          url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        },
        {
          id: 1223700,
          url: 'https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80',
        },
        {
          id: 1223701,
          url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
        },
      ],
    },
  ],
}];
const proxyFeautre = { id: 40350 };
const proxyReviewDataSingle = {
  review_id: 651449,
  rating: 5,
  summary: 'Excepturi vitae fugit quasi culpa eum debitis.',
  recommend: true,
  response: null,
  body: 'Reiciendis et molestias et rerum. Et eos suscipit dolorum ea nemo ad iure atque id. Tenetur officiis qui tempora dignissimos in odio fugiat inventore velit. Facere totam facere incidunt. Architecto earum aut dolorum.',
  date: '2021-02-25T00:00:00.000Z',
  reviewer_name: 'Kasandra.Kuphal7',
  helpfulness: 28,
  photos: [
    {
      id: 1223697,
      url: 'https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    },
  ],
};

test('First test to see if a component renders properly', () => {
  render(<Ratings />);
  const element = screen.getAllByText(/review/i);
  expect(element[0]).toBeInTheDocument();
});

test('Second test to see if a component renders properly', () => {
  render(<TrackerBar />);
});

test('Third test to see if a component renders properly', () => {
  render(<ActiveFilters
    filter="1 star"
  />);
});

// Revisit - Modals are Tough!

test('Fourth test to see if a component renders properly', () => {
  const setModalToggleMock = jest.fn();
  const root = ReactDOM.createRoot(document.createElement('test'));
  root.render(<ReviewImageModal
    imgString="https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"
    name="steven"
    setModalToggle={setModalToggleMock}
  />);
  expect(root.findByType('img')).toBe(true);
});

test('Fifth test to see if a component renders properly', () => {
  render(<DashboardCharacteristicTracker
    reviewMeta={proxyReviewMetaData}
  />);
});

test('Sixth test to see if a component renders properly', () => {
  render(<ReviewSearchBar
    searchTerm="hello"
  />);
});

test('Seventh test to see if a component renders properly', () => {
  render(<ReviewModalStar />);
});

test('Eighth test to see if a component renders properly', () => {
  render(<ReviewModalStars />); // Revist?
});

test('Ninth test to see if a component renders properly', () => {
  render(<ReviewDashboard
    reviews={[proxyReviewDataSingle]}
    selectedRating="1 star, 2 star"
    reviewMeta={proxyReviewMetaData}
    listLength={4}
    listIndex={4}
    setListLength={jest.fn()}
  />);
});

test('Tenth test to see if a component renders properly', () => {
  render(<ModalCharRadioBtns
    reviewMeta={proxyReviewMetaData}
    setChars={jest.fn()}
    characteristics={proxyCharName}
    handleRequiredChars={jest.fn()}
  />);
});

test('Eleventh test to see if a component renders properly', () => {
  render(<ReviewTile
    review={proxyReviewDataSingle}
    setReviews={jest.fn()}
    reviews={proxyReviewData}
    feature={proxyFeautre}
    searchTerm=""
  />);
});

test('Twelfth test to see if a component renders properly', () => {
  render(<SubmitReview
    newReview={{}}
    chars={{}}
    setChars={jest.fn()}
    setNewReview={jest.fn()}
    setReviewModal={jest.fn()}
    feature={proxyFeautre}
    setReviews={jest.fn()}
    setReviewMeta={jest.fn()}
    handleRequiredRecommend={jest.fn()}
    handleRequiredStars={jest.fn()}
    handleRequiredName={jest.fn()}
    handleRequiredEmail={jest.fn()}
    handleRequiredBody={jest.fn()}
    reviewMeta={proxyReviewMetaData}
    handleRequiredChars={jest.fn()}
    setShowThankyou={jest.fn()}
  />);
});

test('Thirteenth test to see if a component renders properly', () => {
  render(<UploadAndDisplayImage
    selectedImage={[]}
    setSelectedImage={jest.fn()}
    newReview={{}}
    setNewReview={jest.fn()}
    imgProgress={{
      1: false, 2: false, 3: false, 4: false, 5: false,
    }}
    setImgProgress={jest.fn()}
  />);
});
