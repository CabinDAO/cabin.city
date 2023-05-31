import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { ColorName } from '../../styles/theme'

import alertSvg from './svg/alert.svg'
import backArrowSvg from './svg/back-arrow.svg'
import builderSvg from './svg/builder.svg'
import caretakerSvg from './svg/caretaker.svg'
import cardHeartSvg from './svg/card-heart.svg'
import checkSvg from './svg/check.svg'
import checkCircleSvg from './svg/check-circle.svg'
import checkStarSvg from './svg/check-star.svg'
import chevronDownSvg from './svg/chevron-down.svg'
import chevronLeftSvg from './svg/chevron-left.svg'
import chevronRightSvg from './svg/chevron-right.svg'
import chevronUpSvg from './svg/chevron-up.svg'
import citizenSvg from './svg/citizen.svg'
import closeSvg from './svg/close.svg'
import copySvg from './svg/copy.svg'
import creatorSvg from './svg/creator.svg'
import dashboardSvg from './svg/dashboard.svg'
import dateSvg from './svg/date.svg'
import draftProposalSvg from './svg/draft-proposal.svg'
import externalLinkSvg from './svg/external-link.svg'
import fileDocumentSvg from './svg/file-document.svg'
import formatBold from './svg/format-bold.svg'
import formatHeader1 from './svg/format-header1.svg'
import formatHeader2 from './svg/format-header2.svg'
import formatItalic from './svg/format-italic.svg'
import formatListBulleted from './svg/format-list-bulleted.svg'
import formatListNumbered from './svg/format-list-numbered.svg'
import formatQuote from './svg/format-quote.svg'
import formatUnderline from './svg/format-underline.svg'
import gathererSvg from './svg/gatherer.svg'
import handWaveSvg from './svg/hand-wave.svg'
import heartOutlineSvg from './svg/heart-outline.svg'
import heartSolidSvg from './svg/heart-solid.svg'
import holdingSvg from './svg/holding.svg'
import infoSvg from './svg/info.svg'
import locationSvg from './svg/location.svg'
import lockSvg from './svg/lock.svg'
import logoCabinSvg from './svg/logo-cabin.svg'
import membersSvg from './svg/members.svg'
import menuSvg from './svg/menu.svg'
import minusSvg from './svg/minus.svg'
import mountainSvg from './svg/mountain.svg'
import moreMenuSvg from './svg/more-menu.svg'
import naturalistSvg from './svg/naturalist.svg'
import neighborhoodSvg from './svg/neighborhood.svg'
import neighborhoodsSvg from './svg/neighborhoods.svg'
import nftSvg from './svg/nft.svg'
import offerSvg from './svg/offer.svg'
import outpostSvg from './svg/outpost.svg'
import pencilSvg from './svg/pencil.svg'
import personSvg from './svg/person.svg'
import plusSvg from './svg/plus.svg'
import profileSvg from './svg/profile.svg'
import profile2Svg from './svg/profile2.svg'
import publishSvg from './svg/publish.svg'
import raceSvg from './svg/race.svg'
import residentSvg from './svg/resident.svg'
import searchSvg from './svg/search.svg'
import signOutSvg from './svg/sign-out.svg'
import sleepSvg from './svg/sleep.svg'
import stampSvg from './svg/stamp.svg'
import staySvg from './svg/stay.svg'
import thumbUpOutlineSvg from './svg/thumb-up-outline.svg'
import thumbUpSvg from './svg/thumb-up.svg'
import trashSvg from './svg/trash.svg'
import twitterSvg from './svg/twitter.svg'
import upArrowSvg from './svg/up-arrow.svg'
import upRightArrowSvg from './svg/up-right-arrow.svg'
import rightArrowSvg from './svg/right-arrow.svg'
import walletSvg from './svg/wallet.svg'
import xCircleSvg from './svg/x-circle.svg'

export const IconSvgs = {
  alert: alertSvg,
  'back-arrow': backArrowSvg,
  builder: builderSvg,
  caretaker: caretakerSvg,
  'card-heart': cardHeartSvg,
  check: checkSvg,
  'check-star': checkStarSvg,
  'check-circle': checkCircleSvg,
  'chevron-down': chevronDownSvg,
  'chevron-left': chevronLeftSvg,
  'chevron-right': chevronRightSvg,
  'chevron-up': chevronUpSvg,
  citizen: citizenSvg,
  close: closeSvg,
  copy: copySvg,
  creator: creatorSvg,
  dashboard: dashboardSvg,
  date: dateSvg,
  'draft-proposal': draftProposalSvg,
  'external-link': externalLinkSvg,
  'file-document': fileDocumentSvg,
  'format-bold': formatBold,
  'format-header1': formatHeader1,
  'format-header2': formatHeader2,
  'format-italic': formatItalic,
  'format-list-bulleted': formatListBulleted,
  'format-list-numbered': formatListNumbered,
  'format-quote': formatQuote,
  'format-underline': formatUnderline,
  gatherer: gathererSvg,
  'hand-wave': handWaveSvg,
  'heart-outline': heartOutlineSvg,
  'heart-solid': heartSolidSvg,
  holding: holdingSvg,
  info: infoSvg,
  location: locationSvg,
  lock: lockSvg,
  'logo-cabin': logoCabinSvg,
  members: membersSvg,
  menu: menuSvg,
  minus: minusSvg,
  mountain: mountainSvg,
  'more-menu': moreMenuSvg,
  naturalist: naturalistSvg,
  neighborhood: neighborhoodSvg,
  neighborhoods: neighborhoodsSvg,
  nft: nftSvg,
  offer: offerSvg,
  outpost: outpostSvg,
  pencil: pencilSvg,
  person: personSvg,
  plus: plusSvg,
  profile: profileSvg,
  profile2: profile2Svg,
  publish: publishSvg,
  race: raceSvg,
  resident: residentSvg,
  search: searchSvg,
  'sign-out': signOutSvg,
  sleep: sleepSvg,
  stamp: stampSvg,
  stay: staySvg,
  'thumb-up-outline': thumbUpOutlineSvg,
  'thumb-up': thumbUpSvg,
  trash: trashSvg,
  twitter: twitterSvg,
  'up-arrow': upArrowSvg,
  'up-right-arrow': upRightArrowSvg,
  'right-arrow': rightArrowSvg,
  wallet: walletSvg,
  'x-circle': xCircleSvg,
}

export type IconName = keyof typeof IconSvgs

interface IconWrapProps {
  $size?: number
  $color?: ColorName | undefined
  className?: string
}

const IconWrap = styled.span<IconWrapProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  svg {
    width: 100%;
    height: 100%;
  }

  ${({ $size }) =>
    $size
      ? css`
          width: ${$size}rem;
          height: ${$size}rem;
        `
      : ''}

  ${({ $color, theme }) =>
    $color
      ? css`
          --icon-color: ${theme.colors[$color as ColorName] || '#1D2939'};
        `
      : ''}
`

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
  size?: number
  color?: ColorName | undefined
  className?: string
}

const Icon = ({ name, size, color, style, className }: IconProps) => {
  const IconComponent = IconSvgs[name]
  if (!IconComponent) {
    throw new Error(`There is no icon named: ${name}.`)
  }

  return (
    <IconWrap
      key={size}
      className={className}
      style={style}
      $color={color}
      $size={size}
    >
      <IconComponent />
    </IconWrap>
  )
}

export default Icon
