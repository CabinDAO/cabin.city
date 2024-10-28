import { MenuItemName } from '@/components/nav/types'

export type GTagEvent = {
  action: Gtag.EventNames | string
  params: Gtag.EventParams | Gtag.CustomParams
}

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

export const contactStewardEvent = (stewardId: string): void => {
  event({
    action: 'contact_steward_click',
    params: {
      steward_id: stewardId,
    },
  })
}

/**
 * @param eventId - The id of the event being applied to.
 **/
export const applyToEventEvent = (eventId: string): void => {
  event({
    action: 'apply_to_event_click',
    params: {
      event_id: eventId,
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

export const acceleratorApplyClickEvent = (source: string): void => {
  event({
    action: 'accelerator_apply_click',
    params: { source },
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
 * @param eventId - The id of the event being applied to.
 **/
export const viewEventsEvent = (eventId?: string): void => {
  event({
    action: 'view_events',
    params: {
      event_id: eventId,
    },
  })
}

/**
 * @param menuOption - The menu option that was clicked.
 **/
export const navBarEvent = (menuOption: MenuItemName): void => {
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

export const onboardingActionEvent = (
  profileId: string,
  action: string
): void => {
  event({
    action: 'onboarding_action',
    params: {
      profile_id: profileId,
      action: action,
    },
  })
}

export const stampClaimClickEvent = (
  profileId: string,
  stampId: number
): void => {
  event({
    action: 'stamp_claim_click',
    params: {
      profile_id: profileId,
      stamp_id: stampId,
    },
  })
}

export const openMessageModalButtonClick = (
  senderId: string,
  recipientId: string,
  location: string
): void => {
  event({
    action: 'open_message_modal_button_click',
    params: {
      sender_id: senderId,
      recipient_id: recipientId,
      location: location,
    },
  })
}

export const sendMessageButtonClickEvent = (
  senderId: string,
  recipientId: string
): void => {
  event({
    action: 'send_message_button_click',
    params: {
      sender_id: senderId,
      recipient_id: recipientId,
    },
  })
}

export const messageSentEvent = (
  senderId: string,
  recipientId: string
): void => {
  event({
    action: 'message_sent',
    params: {
      sender_id: senderId,
      recipient_id: recipientId,
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

const analytics = {
  event,
  signInEvent,
  shareEvent,
  contactStewardEvent,
  applyToEventEvent,
  viewEventsEvent,
  externalLinkEvent,
  navBarEvent,
  reactToPostEvent,
  mintEvent,
  viewCityDirectoryEvent,
  faqItemExpand,
  roleCardsSlideshowEvent,
  foundCitizenLearnMoreEvent,
  signalInterestEvent,
  citizenshipShareDiscordEvent,
  subscribeToNewsletterEvent,
  acceleratorApplyClickEvent,
  onboardingActionEvent,
  stampClaimClickEvent,
  openMessageModalButtonClick,
  sendMessageButtonClickEvent,
  messageSentEvent,
}

export default analytics
