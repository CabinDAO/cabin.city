import styled from 'styled-components'
import { InputText } from '../core/InputText'
import Icon from '../core/Icon'
import { AutofitImage } from '../core/AutofitImage'
import { MutableRefObject, useRef, useState } from 'react'
import { Caption } from '../core/Typography'
import { ScrollToTop } from '../core/ScrollToTop'
import { OwnedNft } from 'alchemy-sdk'
import { getImageUrlFromNft } from '@/lib/image'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`

const SearchResults = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 1.6rem;
  column-gap: 0.8rem;
  min-width: 100%;
  min-height: 100%;
`

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;
`

const NftImage = styled.div`
  position: relative;
  min-width: 9.4rem;
  min-height: 10.4rem;
  width: auto;
  height: auto;
`

interface SearchNftsProps {
  nfts: OwnedNft[]
  onSelect: (nft: OwnedNft) => void
}

export const SearchNft = ({ nfts, onSelect }: SearchNftsProps) => {
  const [searchResults, setSearchResults] = useState<OwnedNft[]>(nfts)
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const searchBarRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === '') {
      setSearchResults(nfts)
      return
    }

    const results = nfts.filter((nft) =>
      nft.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
    setSearchResults(results)
  }

  const handleSearchResultClick = (nft: OwnedNft) => {
    onSelect(nft)
  }

  return (
    <Container ref={containerRef}>
      <ScrollToTop controlRef={searchBarRef} scrollableRef={containerRef} />
      <div ref={searchBarRef}>
        <InputText
          placeholder="Search"
          onChange={handleSearch}
          endAdornment={<Icon name="search" size={1.3} />}
        />
      </div>
      <SearchResults>
        {searchResults.map((nft) => {
          return (
            <SearchResult
              key={nft.tokenId}
              onClick={() => handleSearchResultClick(nft)}
            >
              <NftImage>
                <AutofitImage src={getImageUrlFromNft(nft)} alt={nft.title} />
              </NftImage>
              <Caption emphasized>{nft.title}</Caption>
            </SearchResult>
          )
        })}
      </SearchResults>
    </Container>
  )
}
