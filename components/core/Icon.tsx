import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { ColorName } from '../../styles/theme'

import accountBoxSvg from './svg/account-box.svg'
import accountGroupSvg from './svg/account-group.svg'
import accountGroupGreenSvg from './svg/account-group-green.svg'
import alertSvg from './svg/alert.svg'
import backpackSvg from './svg/backpack.svg'
import backpackGreenSvg from './svg/backpack-green.svg'
import backArrowSvg from './svg/back-arrow.svg'
import businessHandshakeSvg from './svg/business-handshake.svg'
import builderSvg from './svg/builder.svg'
import calendarStarFourPointsSvg from './svg/calendar-star-four-points.svg'
import cardHeartSvg from './svg/card-heart.svg'
import chatBubbleSvg from './svg/chat-bubble.svg'
import checkSvg from './svg/check.svg'
import checkCircleSvg from './svg/check-circle.svg'
import checkCircleGreenSvg from './svg/check-circle-green.svg'
import checkDecagramSvg from './svg/check-decagram.svg'
import checkStarSvg from './svg/check-star.svg'
import chevronDownSvg from './svg/chevron-down.svg'
import chevronLeftSvg from './svg/chevron-left.svg'
import chevronRightSvg from './svg/chevron-right.svg'
import chevronUpSvg from './svg/chevron-up.svg'
import citizenSvg from './svg/citizen.svg'
import closeSvg from './svg/close.svg'
import closeLong from './svg/close-long.svg'
import coinSvg from './svg/coin.svg'
import copySvg from './svg/copy.svg'
import creatorSvg from './svg/creator.svg'
import dashboardSvg from './svg/dashboard.svg'
import dateSvg from './svg/date.svg'
import discountSvg from './svg/discount.svg'
import draftProposalSvg from './svg/draft-proposal.svg'
import exclamationMarkSvg from './svg/exclamation-mark.svg'
import externalLinkSvg from './svg/external-link.svg'
import fileDocumentSvg from './svg/file-document.svg'
import flagSvg from './svg/flag.svg'
import flowerSvg from './svg/flower.svg'
import formatBold from './svg/format-bold.svg'
import formatButton from './svg/format-button.svg'
import formatHeader1 from './svg/format-header1.svg'
import formatHeader2 from './svg/format-header2.svg'
import formatItalic from './svg/format-italic.svg'
import formatLink from './svg/format-link.svg'
import formatListBulleted from './svg/format-list-bulleted.svg'
import formatListNumbered from './svg/format-list-numbered.svg'
import formatQuote from './svg/format-quote.svg'
import formatUnderline from './svg/format-underline.svg'
import forumSvg from './svg/forum.svg'
import gathererSvg from './svg/gatherer.svg'
import handSvg from './svg/hand.svg'
import handWaveSvg from './svg/hand-wave.svg'
import handWaveGreenSvg from './svg/hand-wave-green.svg'
import heartOutlineSvg from './svg/heart-outline.svg'
import heartSolidSvg from './svg/heart-solid.svg'
import holdingSvg from './svg/holding.svg'
import image from './svg/image.svg'
import infoSvg from './svg/info.svg'
import keySvg from './svg/key.svg'
import lightningBoltSvg from './svg/lightning-bolt.svg'
import locationSvg from './svg/location.svg'
import lockSvg from './svg/lock.svg'
import logoCabinSvg from './svg/logo-cabin.svg'
import mapFoldSvg from './svg/map-fold.svg'
import mapFoldGreenSvg from './svg/map-fold-green.svg'
import membersSvg from './svg/members.svg'
import menuSvg from './svg/menu.svg'
import minusSvg from './svg/minus.svg'
import moonStarsSvg from './svg/moon-stars.svg'
import mountainSvg from './svg/mountain.svg'
import mountainsSvg from './svg/mountains.svg'
import moreMenuSvg from './svg/more-menu.svg'
import naturalistSvg from './svg/naturalist.svg'
import neighborhoodSvg from './svg/neighborhood.svg'
import neighborhoodLabelSvg from './svg/neighborhood-label.svg'
import networkGlobeSvg from './svg/network-globe.svg'
import nftSvg from './svg/nft.svg'
import offerSvg from './svg/offer.svg'
import outpostSvg from './svg/outpost.svg'
import passportSvg from './svg/passport.svg'
import peaceSignSvg from './svg/peace-sign.svg'
import pencilSvg from './svg/pencil.svg'
import personSvg from './svg/person.svg'
import plusSvg from './svg/plus.svg'
import profileSvg from './svg/profile.svg'
import profile2Svg from './svg/profile2.svg'
import publishSvg from './svg/publish.svg'
import raceSvg from './svg/race.svg'
import residentSvg from './svg/resident.svg'
import scheduleGreenSvg from './svg/schedule-green.svg'
import searchSvg from './svg/search.svg'
import shieldSvg from './svg/shield.svg'
import shirtSvg from './svg/shirt.svg'
import silhouette from './svg/silhouette.svg'
import signOutSvg from './svg/sign-out.svg'
import sleepSvg from './svg/sleep.svg'
import stampSvg from './svg/stamp.svg'
import staySvg from './svg/stay.svg'
import takeoutSvg from './svg/takeout.svg'
import thumbUpOutlineSvg from './svg/thumb-up-outline.svg'
import thumbUpSvg from './svg/thumb-up.svg'
import ticketSvg from './svg/ticket.svg'
import trashSvg from './svg/trash.svg'
import twitterSvg from './svg/twitter.svg'
import upArrowSvg from './svg/up-arrow.svg'
import upRightArrowSvg from './svg/up-right-arrow.svg'
import rightArrowSvg from './svg/right-arrow.svg'
import walletSvg from './svg/wallet.svg'
import xCircleSvg from './svg/x-circle.svg'
import xLogoSvg from './svg/x-logo.svg'

export const IconSvgs = {
  'account-box': accountBoxSvg,
  'account-group': accountGroupSvg,
  'account-group-green': accountGroupGreenSvg,
  alert: alertSvg,
  backpack: backpackSvg,
  'backpack-green': backpackGreenSvg,
  'back-arrow': backArrowSvg,
  builder: builderSvg,
  'business-handshake': businessHandshakeSvg,
  'calendar-star-four-points': calendarStarFourPointsSvg,
  'card-heart': cardHeartSvg,
  'chat-bubble': chatBubbleSvg,
  check: checkSvg,
  'check-circle': checkCircleSvg,
  'check-circle-green': checkCircleGreenSvg,
  'check-decagram': checkDecagramSvg,
  'check-star': checkStarSvg,
  'chevron-down': chevronDownSvg,
  'chevron-left': chevronLeftSvg,
  'chevron-right': chevronRightSvg,
  'chevron-up': chevronUpSvg,
  citizen: citizenSvg,
  close: closeSvg,
  'close-long': closeLong,
  coin: coinSvg,
  copy: copySvg,
  creator: creatorSvg,
  dashboard: dashboardSvg,
  date: dateSvg,
  discount: discountSvg,
  'draft-proposal': draftProposalSvg,
  'exclamation-mark': exclamationMarkSvg,
  'external-link': externalLinkSvg,
  'file-document': fileDocumentSvg,
  flag: flagSvg,
  flower: flowerSvg,
  'format-bold': formatBold,
  'format-button': formatButton,
  'format-header1': formatHeader1,
  'format-header2': formatHeader2,
  'format-italic': formatItalic,
  'format-link': formatLink,
  'format-list-bulleted': formatListBulleted,
  'format-list-numbered': formatListNumbered,
  'format-quote': formatQuote,
  'format-underline': formatUnderline,
  forum: forumSvg,
  gatherer: gathererSvg,
  hand: handSvg,
  'hand-wave': handWaveSvg,
  'hand-wave-green': handWaveGreenSvg,
  'heart-outline': heartOutlineSvg,
  'heart-solid': heartSolidSvg,
  holding: holdingSvg,
  image: image,
  info: infoSvg,
  key: keySvg,
  'lightning-bolt': lightningBoltSvg,
  location: locationSvg,
  lock: lockSvg,
  'logo-cabin': logoCabinSvg,
  'map-fold': mapFoldSvg,
  'map-fold-green': mapFoldGreenSvg,
  members: membersSvg,
  menu: menuSvg,
  minus: minusSvg,
  'moon-stars': moonStarsSvg,
  mountain: mountainSvg,
  mountains: mountainsSvg,
  'more-menu': moreMenuSvg,
  naturalist: naturalistSvg,
  neighborhood: neighborhoodSvg,
  'neighborhood-label': neighborhoodLabelSvg,
  'network-globe': networkGlobeSvg,
  nft: nftSvg,
  offer: offerSvg,
  outpost: outpostSvg,
  passport: passportSvg,
  'peace-sign': peaceSignSvg,
  pencil: pencilSvg,
  person: personSvg,
  plus: plusSvg,
  profile: profileSvg,
  profile2: profile2Svg,
  publish: publishSvg,
  race: raceSvg,
  resident: residentSvg,
  'schedule-green': scheduleGreenSvg,
  search: searchSvg,
  shield: shieldSvg,
  shirt: shirtSvg,
  silhouette: silhouette,
  'sign-out': signOutSvg,
  sleep: sleepSvg,
  stamp: stampSvg,
  stay: staySvg,
  takeout: takeoutSvg,
  'thumb-up-outline': thumbUpOutlineSvg,
  'thumb-up': thumbUpSvg,
  ticket: ticketSvg,
  trash: trashSvg,
  twitter: twitterSvg,
  'up-arrow': upArrowSvg,
  'up-right-arrow': upRightArrowSvg,
  'right-arrow': rightArrowSvg,
  wallet: walletSvg,
  'x-circle': xCircleSvg,
  'x-logo': xLogoSvg,
}

export type IconName = keyof typeof IconSvgs

interface IconWrapProps {
  $size?: number
  $color?: ColorName | undefined
  className?: string
  $inline?: boolean
}

const IconWrap = styled.span<IconWrapProps>`
  display: ${({ $inline }) => ($inline ? 'inline-block' : 'flex')};
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
  inline?: boolean
}

const Icon = ({ name, size, color, style, className, inline }: IconProps) => {
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
      $inline={inline}
    >
      <IconComponent />
    </IconWrap>
  )
}

export default Icon
