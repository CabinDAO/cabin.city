import { GTagEvent } from './types'
import { MenuItemOption } from '@/utils/nav/types'

/**
 *
 * @param socialService - Social Network: Facebook, Twitter, Instagram, etc.
 * @param contentType - The type of content that was shared, e.g. profile
 * @param itemId - The ID of the item that was shared.
 *
 */
export const shareEvent = (
  socialService: string,
  contentType: string,
  itemId: string
): void => {
  event({
    action: 'share',
    params: {
      method: socialService,
      content_type: contentType,
      item_id: itemId,
    },
  })
}

export const signInEvent = (): void => {
  event({
    action: 'sign_in_click',
    params: {},
  })
}

/**
 * @param listingId - The id of the listing being voted on.
 **/
export const voteModalEvent = (listingId: string): void => {
  event({
    action: 'vote_modal_click',
    params: { listing_id: listingId },
  })
}

/**
 * @param caretakerId - The id of the caretaker being contacted.
 **/
export const contactCaretakerEvent = (caretakerId: string): void => {
  event({
    action: 'contact_caretaker_click',
    params: {
      caretaker_id: caretakerId,
    },
  })
}

/**
 * @param experienceId - The id of the experience being applied to.
 **/
export const applyToExperienceEvent = (experienceId: string): void => {
  event({
    action: 'apply_to_experience_click',
    params: {
      experience_id: experienceId,
    },
  })
}

/**
 * @param url - The url of the external link being clicked.
 **/
export const externalLinkEvent = (url: string): void => {
  event({
    action: 'external_link_click',
    params: {
      url,
    },
  })
}

/**
 * @param activityId - The id of the activity being reacted to.
 **/
export const reactToPostEvent = (
  activityId: string,
  action: 'like' | 'unlike'
): void => {
  event({
    action: 'react_to_post',
    params: {
      actity_id: activityId,
      action,
    },
  })
}

/**
 * @param profileId - The id of the profile being minted.
 **/
export const mintEvent = (profileId: string): void => {
  event({
    action: 'mint_button',
    params: {
      profileId,
    },
  })
}

/**
 * @param specificListingId - The id of the listing being viewed.
 **/
export const viewCityDirectoryEvent = (specificListingId?: string): void => {
  event({
    action: 'view_city_directory',
    params: {
      listing_id: specificListingId,
    },
  })
}

/**
 * @param experienceId - The id of the experience being applied to.
 **/
export const viewExperiencesEvent = (experienceId?: string): void => {
  event({
    action: 'view_experiences',
    params: {
      experience_id: experienceId,
    },
  })
}

/**
 * @param menuOption - The menu option that was clicked.
 **/
export const navBarEvent = (menuOption: MenuItemOption): void => {
  event({
    action: 'nav_bar_click',
    params: {
      menu_option: menuOption,
    },
  })
}

/**
 * @param faqItem - The FAQ item that was clicked.
 **/
export const faqItemExpand = (faqItem: string): void => {
  event({
    action: 'faq_item_expand',
    params: {
      faq_item: faqItem,
    },
  })
}

export const roleCardsSlideshowEvent = (): void => {
  event({
    action: 'role_cards_slideshow',
    params: {},
  })
}

export const foundCitizenLearnMoreEvent = (): void => {
  event({
    action: 'found_citizen_learn_more',
    params: {},
  })
}

/**
 * @param profileId - The id of the profile being signaled.
 **/
export const signalInterestEvent = (profileId: string): void => {
  event({
    action: 'signal_interest',
    params: {
      profile_id: profileId,
    },
  })
}

/**
 * @param profileId - The id of the profile being signaled.
 **/
export const citizenshipShareDiscordEvent = (profileId: string): void => {
  event({
    action: 'citizenship_share_discord',
    params: {
      profile_id: profileId,
    },
  })
}

/**
 * @param email - The email of the user subscribing to the newsletter.
 **/
export const subscribeToNewsletterEvent = (email: string): void => {
  event({
    action: 'subscribe_to_newsletter',
    params: {
      email,
    },
  })
}

/**
 * @param action - The name of the event you want to track.
 * @param params - A map of event parameters.
 *
 * This represents a fallback for custom events that are not covered by the other functions in this file.
 * @see https://developers.google.com/tag-platform/gtagjs/reference/events
 **/
export const event = ({ action, params }: GTagEvent): void => {
  if (typeof window !== 'undefined') {
    console.info(`[GA] ${action}`, params)
    gtag('event', action, params)
  }
}

const events = {
  event,
  signInEvent,
  shareEvent,
  contactCaretakerEvent,
  voteModalEvent,
  applyToExperienceEvent,
  externalLinkEvent,
  navBarEvent,
  reactToPostEvent,
  mintEvent,
  viewCityDirectoryEvent,
  faqItemExpand,
  roleCardsSlideshowEvent,
  foundCitizenLearnMoreEvent,
  viewExperiencesEvent,
  signalInterestEvent,
  citizenshipShareDiscordEvent,
  subscribeToNewsletterEvent,
}

export default events
