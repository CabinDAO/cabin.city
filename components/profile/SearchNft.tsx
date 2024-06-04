import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import Icon from '@/components/core/Icon'
import { AutofitImage } from '@/components/core/AutofitImage'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Caption, WordBreak } from '@/components/core/Typography'
import { ScrollToTop } from '@/components/core/ScrollToTop'
import { getImageUrlFromNft } from '@/lib/image'
import { ExtendedOwnedNft } from './AvatarModal'

interface SearchNftsProps {
  nfts: ExtendedOwnedNft[]
  onSelect: (nft: ExtendedOwnedNft) => void
}

export const SearchNft = ({ nfts, onSelect }: SearchNftsProps) => {
  const [searchResults, setSearchResults] = useState<ExtendedOwnedNft[]>([])
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const searchBarRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    setSearchResults(nfts)
  }, [nfts])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === '') {
      setSearchResults(nfts)
      return
    }

    const results = nfts.filter((nft) =>
      nft.name?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
    setSearchResults(results)
  }

  const handleSearchResultClick = (nft: ExtendedOwnedNft) => {
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
                <AutofitImage
                  src={getImageUrlFromNft(nft)}
                  alt={nft.name || ''}
                />
              </NftImage>
              <CaptionContainer>
                <Caption emphasized>{nft.name}</Caption>
              </CaptionContainer>
            </SearchResult>
          )
        })}
      </SearchResults>
    </Container>
  )
}

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
  width: 100%;
  height: 100%;
  max-width: 11.4rem;
  max-height: 11.4rem;
`

const CaptionContainer = styled(WordBreak)`
  display: flex;
  flex-direction: column;
  text-align: center;
`
