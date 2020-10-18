import React, {useState, useEffect} from 'react';
import {PanelProps} from '@grafana/data';
import {SimpleOptions} from 'types';

import {instance} from "./api/api";
import {Image} from "./components/Image";
import {stylesFactory} from '@grafana/ui';
import {css, cx} from "emotion";

interface Props extends PanelProps<SimpleOptions> {
}

let searchLimit: number;
export const App: React.FC<Props> = ({options, data, width, height}) => {

  const styles = getStyles();
  const [searchTerm, setSearchTerm] = useState('')
  const [img, setImg] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  switch (options.results) {
    case 5:
      searchLimit = 5;
      break;
    case 10:
      searchLimit = 10;
      break;
    case 15:
      searchLimit = 15;
      break;
    case 20:
      searchLimit = 20;
      break;
    case 25:
      searchLimit = 25;
      break;
    case 30:
      searchLimit = 30;
      break;
    case 40:
      searchLimit = 40;
      break;
    case 50:
      searchLimit = 50;
      break;
    case 100:
      searchLimit = 100;
      break;
  }

  useEffect(() => {
    getSearchImage('happy holidays', searchLimit)
  }, []);

  const getSearchImage = async (searchTerm: string, searchLimit: number) => {
    await instance.get(
      'gifs/search',
      {
        params: {
          q: searchTerm,
          limit: searchLimit
        }
      }
    ).then((r: { data: { data: { map: (arg0: (imgUrl: any) => any) => React.SetStateAction<never[]>; }; }; }) => {
      setImg(r.data.data.map(imgUrl => imgUrl.images.original.url))
      setIsLoading(false)
    })
  }

  const onInputChange = (event: { target?: any; keyCode?: any; }) => {
    const {keyCode} = event
    setSearchTerm(event.target.value)

    if (keyCode === 13) {
      setIsLoading(true)
      getSearchImage(event.target.value, searchLimit)
        .then(data => {
          // @ts-ignore
          setImg(data)
          setIsLoading(false)
        })
    }
  }

  const onFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setIsLoading(true)
    getSearchImage(searchTerm, searchLimit)
  }

  const getImages = () => {

    if (isLoading) {
      return <div>Loading ...</div>
    }

    if (!img.length && !isLoading) {
      return <div>Sorry, nothing found</div>
    }

    return img.map((imgSrc, index) => renderImage(imgSrc, index))
  }

  const renderImage = (imgSrc: never, index: string | number | null | undefined) => (
    <div key={index}>
      <Image
        src={imgSrc}
        index={index}/>
    </div>
  )

  return (
    <div
      data-testid="wrapper"
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div
        data-testid="header"
        className={styles.header}>
        <form
          data-testid="search-form"
          onSubmit={onFormSubmit}>
          <input
            data-testid="search-input-field"
            type="search"
            name="searchTerm"
            placeholder="Please, enter a keyword"
            required
            autoComplete="off"
            title="Allowed size (min: 1, max: 40 symbols)"
            pattern=".{1,40}"
            value={searchTerm}
            onChange={onInputChange}
          />
          <button
            data-testid="search-button"
            type="submit"
            disabled={searchTerm.length < 1}
          >
            Search
          </button>
          <div className={styles.comment}>Search limit: {searchLimit} images
            (Edit &rarr;Panel &rarr; Display &rarr; Change limit &rarr; Apply)
          </div>
        </form>
      </div>

      <div
        data-testid="image-grid"
        className={styles.grid}>
        {getImages()}
      </div>
    </div>)
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      overflow: scroll;
    `,
    header: css`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px auto 25px;
    `,
    comment: css`
      font: 12px Arial, sans-serif;
      margin: 5px;
    `,
    grid: css`
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 15px;
    `,
  };
});
