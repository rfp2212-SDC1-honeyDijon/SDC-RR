import React from 'react';
import {
  render, screen, cleanup, fireEvent, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import fetcherMock from '../../client/src/fetchers';
import MockData from '../example_data/related/MockData';
import Related from '../../client/src/components/Related/Related.jsx';
import OutfitList from '../../client/src/components/Related/outfit-components/OutfitList.jsx';
import RelatedProduct from '../../client/src/components/Related/related-components/RelatedProduct.jsx';
import RelatedList from '../../client/src/components/Related/related-components/RelatedList.jsx';

jest.mock('../../client/src/fetchers');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Related & Outfit Component', () => {
  describe('Related Component', () => {
    test('should render correctly even fail fatch data', async () => {
      fetcherMock.getProductById
        .mockRejectedValue(new Error('Failed'));
      fetcherMock.getReviewMeta
        .mockRejectedValue(new Error('Failed'));
      fetcherMock.getProductStyle
        .mockRejectedValue(new Error('Failed'));

      render(<Related
        feature={MockData.feature}
        relatedIdList={[40344, 40346]}
        recordClick={jest.fn()}
      />);

      const allDivElement = await screen.findAllByRole('generic');
      expect(allDivElement.length).toBe(8);
    });

    test('should not render when fail fetch data', async () => {
      fetcherMock.getProductById
        .mockResolvedValueOnce(new Error('Error'))
        .mockResolvedValueOnce(new Error('Error'));

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureStyle });

      act(() => {
        render(<Related
          feature={MockData.feature}
          relatedIdList={[40344, 40346]}
          recordClick={jest.fn()}
        />);
      });

      await waitFor(() => expect(fetcherMock.getProductById).toHaveBeenCalledTimes(2));
    });

    test('should correctly render related component', async () => {
      fetcherMock.getProductById
        .mockResolvedValueOnce({ data: MockData.style_40344 })
        .mockResolvedValueOnce({ data: MockData.style_40346 });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureStyle });

      act(() => {
        render(<Related
          feature={MockData.feature}
          relatedIdList={[40344, 40346]}
          recordClick={jest.fn()}
        />);
      });

      await waitFor(() => expect(fetcherMock.getReviewMeta).toHaveBeenCalledTimes(1));
      const h3Element = screen.queryByText('RELATED PRODUCTS', { exact: false });
      expect(h3Element).toBeInTheDocument();
    });
  });

  describe('Outfit Component', () => {
    test('should catch error when fetch fails', () => {
      fetcherMock.getProductById
        .mockRejectedValueOnce(new Error('Failed'));
      fetcherMock.getReviewMeta
        .mockRejectedValueOnce(new Error('Failed'));
      fetcherMock.getProductStyle
        .mockRejectedValueOnce(new Error('Failed'));

      render(<OutfitList
        feature={MockData.feature}
        outfitIdList={[40344]}
        recordClick={jest.fn()}
      />);
    });

    test('should correctly render with empty outfit list', () => {
      render(<OutfitList
        feature={MockData.feature}
        outfitIdList={[]}
        recordClick={jest.fn()}
      />);

      const imgElement = screen.queryByRole('img');
      expect(imgElement).not.toBeInTheDocument();
    });

    test('should correctly render with non-empty outfit list', async () => {
      fetcherMock.getProductById
        .mockResolvedValueOnce({ data: MockData.rel_40346 })
        .mockResolvedValueOnce({ data: MockData.feature });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureMeta })
        .mockResolvedValueOnce({ data: MockData.meta_40346 })
        .mockResolvedValueOnce({ data: MockData.featureMeta });

      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40346 })
        .mockResolvedValueOnce({ data: MockData.featureStyle });

      render(<Related
        feature={MockData.feature}
        relatedIdList={[40346]}
        recordClick={jest.fn()}
      />);

      expect(screen.queryByText(MockData.feature.name)).not.toBeInTheDocument();
      const addIcon = screen.getByTitle('outfit-add-icon');
      await userEvent.click(addIcon);

      expect(await screen.findByText(MockData.rel_40346.name)).toBeInTheDocument();
      expect(await screen.findByText(MockData.feature.name)).toBeInTheDocument();

      const deleteIcon = screen.getByTitle('outfit-delete-icon');
      await userEvent.click(deleteIcon);

      expect(await screen.queryByText(MockData.feature.name)).not.toBeInTheDocument();
    });
  });

  describe('RelatedList Component', () => {
    test('should render relatedList after fail to fetch the data', async () => {
      fetcherMock.getReviewMeta
        .mockRejectedValue(new Error('Failed'));

      render(<RelatedList
        feature={MockData.feature}
        relatedInfoList={[40344]}
        recordClick={jest.fn()}
      />);

      const allImage = await screen.queryAllByRole('img');
      expect(allImage.length).toBe(0);
    });

    test('should render correctly', async () => {
      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40344 })
        .mockResolvedValueOnce({ data: MockData.style_40345 })
        .mockResolvedValueOnce({ data: MockData.style_40346 })
        .mockResolvedValueOnce({ data: MockData.style_40347 })
        .mockResolvedValueOnce({ data: MockData.style_40348 });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.featureMeta })
        .mockResolvedValueOnce({ data: MockData.meta_40344 })
        .mockResolvedValueOnce({ data: MockData.meta_40345 })
        .mockResolvedValueOnce({ data: MockData.meta_40346 })
        .mockResolvedValueOnce({ data: MockData.meta_40347 })
        .mockResolvedValueOnce({ data: MockData.meta_40348 });

      render(<RelatedList
        feature={MockData.feature}
        relatedInfoList={[
          MockData.rel_40344,
          MockData.rel_40345,
          MockData.rel_40346,
          MockData.rel_40347,
          MockData.rel_40348,
        ]}
        recordClick={jest.fn()}
      />);

      const leftArrowIcon = screen.getByTitle('related-left-arrow');
      const rightArrowIcon = screen.getByTitle('related-right-arrow');
      const allImage = await screen.findAllByRole('img');

      userEvent.click(leftArrowIcon);
      userEvent.click(rightArrowIcon);
      expect(allImage.length).toBe(5);
    });
  });

  describe('RelatedProduct Component Fetch Fail', () => {
    test('should fail fetch data', async () => {
      fetcherMock.getProductStyle
        .mockResolvedValueOnce(new Error('Error'));

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce(new Error('Error'));

      act(() => {
        render(<RelatedProduct
          feature={MockData.feature}
          featureMeta={MockData.featureMeta}
          relProd={MockData.rel_40344}
          recordClick={jest.fn()}
        />);
      });

      const relatedImage = await screen.queryByAltText('Not Available', { exact: false });
      expect(relatedImage).not.toBeInTheDocument();
    });
  });

  describe('RelatedProduct Component Fetch Successfully', () => {
    beforeEach(async () => {
      fetcherMock.getProductStyle
        .mockResolvedValueOnce({ data: MockData.style_40344 });

      fetcherMock.getReviewMeta
        .mockResolvedValueOnce({ data: MockData.meta_40344 });

      act(() => {
        render(<RelatedProduct
          feature={MockData.feature}
          featureMeta={MockData.featureMeta}
          relProd={MockData.rel_40344}
          recordClick={jest.fn()}
        />);
      });
    });

    test('should correctly render related product image with correct alt text', async () => {
      const relatedImage = await screen.findByAltText('Not Available', { exact: false });
      expect(relatedImage).toBeInTheDocument();
    });

    test('should function correctly on image carousel onMouseEnter/onMoustLeave', async () => {
      await screen.findByAltText('Not Available', { exact: false });

      const mainImage = screen.getByRole('img');
      const mainImageSrcBefore = Object.values(mainImage)[1].src;

      expect(screen.queryAllByRole('img')).toHaveLength(1);

      act(() => {
        fireEvent.mouseOver(mainImage);
      });

      const allImageAfterMoustover = await screen.findAllByRole('img');
      expect(allImageAfterMoustover).toHaveLength(7);

      act(() => {
        fireEvent.mouseOut(mainImage);
      });

      const allImageAfterMouseout = await screen.findAllByRole('img');
      const mainImageSrcAfter = Object.values(allImageAfterMouseout[0])[1].src;

      expect(allImageAfterMouseout).toHaveLength(1);
      expect(mainImageSrcBefore).toBe(mainImageSrcAfter);
    });

    test('should replace the main image when click on other image shown in image carousel', async () => {
      await screen.findByAltText('Not Available', { exact: false });
      const mainImage = screen.getByRole('img');
      const mainImageSrcBefore = Object.values(mainImage)[1].src;

      expect(screen.getAllByRole('img')).toHaveLength(1);

      await fireEvent.mouseOver(mainImage);

      const allImageAfterMoustover = await screen.findAllByRole('img');

      await userEvent.click(allImageAfterMoustover[2]);

      await fireEvent.mouseOut(mainImage);

      const allImageAfterMouseout = await screen.findAllByRole('img');
      const mainImageSrcAfter = Object.values(allImageAfterMouseout[0])[1].src;
      expect(allImageAfterMouseout).toHaveLength(1);

      expect(mainImageSrcBefore).not.toBe(mainImageSrcAfter);
    });

    test('should replace main image when press key on other image shown in image carousel', async () => {
      await screen.findByAltText('Not Available', { exact: false });
      const mainImage = screen.getByRole('img');
      const mainImageSrcBefore = Object.values(mainImage)[1].src;

      expect(screen.getAllByRole('img')).toHaveLength(1);

      await fireEvent.mouseOver(mainImage);

      const allImageAfterMoustover = await screen.findAllByRole('img');

      await fireEvent.keyDown(
        allImageAfterMoustover[2],
        { key: 'Enter', code: 'Enter', charCode: 13 },
      );

      await fireEvent.mouseOut(mainImage);

      const allImageAfterMouseout = await screen.findAllByRole('img');
      const mainImageSrcAfter = Object.values(allImageAfterMouseout[0])[1].src;
      expect(allImageAfterMouseout).toHaveLength(1);

      expect(mainImageSrcBefore).not.toBe(mainImageSrcAfter);
    });

    test('should be able to open and close comparison modal', async () => {
      await screen.findByAltText('Not Available', { exact: false });

      // Expect only one image has been rendered
      expect(screen.getAllByRole('img')).toHaveLength(1);

      // Find the star icon by using getByTitle
      const starModalIcon = screen.getByTitle('star-modal-icon', { exact: false });

      // Use `queryBy` to avoid throwing an error with `getBy`
      expect(screen.queryByTitle('compare-test-title')).not.toBeInTheDocument();
      await userEvent.click(starModalIcon);

      // Expect the comparison table to be in the dom after click
      const thElement = screen.queryByRole('columnheader', {
        name: 'Blues Suede Shoes',
      });
      expect(thElement).toBeInTheDocument();

      // Expect there are exact three table head tags in DOM
      const allThElements = screen.getAllByRole('columnheader');
      expect(allThElements).toHaveLength(3);

      // Expect close icon to be in the DOM
      const closeModalIcon = screen.getByTitle('close-modal-icon', { exact: false });
      expect(screen.queryByTitle('close-modal-icon')).toBeInTheDocument();
      await userEvent.click(closeModalIcon);

      // Expect close icon to not be in the DOM after close it
      expect(screen.queryByTitle('close-modal-icon')).not.toBeInTheDocument();
    });

    test('should be able to click image and change related product', async () => {
      // await screen.findByAltText('Not Available', { exact: false });

      // act(() => {
      //   fireEvent.click(screen.getByRole('img'));
      // });

      // fetcherMock.getProductStyle
      //   .mockResolvedValueOnce({ data: MockData.style_40346 });

      // fetcherMock.getReviewMeta
      //   .mockResolvedValueOnce({ data: MockData.meta_40346 });

      // screen.debug();
    });
  });
});
