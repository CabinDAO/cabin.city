import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { ColorName } from '../../styles/theme'

import backArrowSvg from './svg/back-arrow.svg'
import builderSvg from './svg/builder.svg'
import caretakerSvg from './svg/caretaker.svg'
import cardHeartSvg from './svg/card-heart.svg'
import checkSvg from './svg/check.svg'
import checkStarSvg from './svg/check-star.svg'
import chevronDownSvg from './svg/chevron-down.svg'
import chevronLeftSvg from './svg/chevron-left.svg'
import chevronRightSvg from './svg/chevron-right.svg'
import citizenSvg from './svg/citizen.svg'
import closeSvg from './svg/close.svg'
import copySvg from './svg/copy.svg'
import creatorSvg from './svg/creator.svg'
import dashboardSvg from './svg/dashboard.svg'
import dateSvg from './svg/date.svg'
import externalLinkSvg from './svg/external-link.svg'
import gathererSvg from './svg/gatherer.svg'
import handWaveSvg from './svg/hand-wave.svg'
import heartOutlineSvg from './svg/heart-outline.svg'
import heartSolidSvg from './svg/heart-solid.svg'
import infoSvg from './svg/info.svg'
import locationSvg from './svg/location.svg'
import lockSvg from './svg/lock.svg'
import logoCabinSvg from './svg/logo-cabin.svg'
import membersSvg from './svg/members.svg'
import menuSvg from './svg/menu.svg'
import mountainSvg from './svg/mountain.svg'
import naturalistSvg from './svg/naturalist.svg'
import neighborhoodsSvg from './svg/neighborhoods.svg'
import personSvg from './svg/person.svg'
import profileSvg from './svg/profile.svg'
import profile2Svg from './svg/profile2.svg'
import raceSvg from './svg/race.svg'
import residentSvg from './svg/resident.svg'
import searchSvg from './svg/search.svg'
import signOutSvg from './svg/sign-out.svg'
import stampSvg from './svg/stamp.svg'
import staySvg from './svg/stay.svg'
import thumbUpOutlineSvg from './svg/thumb-up-outline.svg'
import thumbUpSvg from './svg/thumb-up.svg'
import trashSvg from './svg/trash.svg'
import twitterSvg from './svg/twitter.svg'
import upArrowSvg from './svg/up-arrow.svg'
import upRightArrowSvg from './svg/up-right-arrow.svg'

export const IconSvgs = {
  'back-arrow': backArrowSvg,
  builder: builderSvg,
  caretaker: caretakerSvg,
  'card-heart': cardHeartSvg,
  check: checkSvg,
  'check-star': checkStarSvg,
  'chevron-down': chevronDownSvg,
  'chevron-left': chevronLeftSvg,
  'chevron-right': chevronRightSvg,
  citizen: citizenSvg,
  close: closeSvg,
  copy: copySvg,
  creator: creatorSvg,
  dashboard: dashboardSvg,
  date: dateSvg,
  'external-link': externalLinkSvg,
  gatherer: gathererSvg,
  'hand-wave': handWaveSvg,
  'heart-outline': heartOutlineSvg,
  'heart-solid': heartSolidSvg,
  info: infoSvg,
  location: locationSvg,
  lock: lockSvg,
  'logo-cabin': logoCabinSvg,
  members: membersSvg,
  menu: menuSvg,
  mountain: mountainSvg,
  naturalist: naturalistSvg,
  neighborhoods: neighborhoodsSvg,
  person: personSvg,
  profile: profileSvg,
  profile2: profile2Svg,
  race: raceSvg,
  resident: residentSvg,
  search: searchSvg,
  'sign-out': signOutSvg,
  stamp: stampSvg,
  stay: staySvg,
  'thumb-up-outline': thumbUpOutlineSvg,
  'thumb-up': thumbUpSvg,
  trash: trashSvg,
  twitter: twitterSvg,
  'up-arrow': upArrowSvg,
  'up-right-arrow': upRightArrowSvg,
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
