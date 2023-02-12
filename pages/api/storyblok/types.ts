type IStoryblokEventType = 'published' | 'unpublished' | 'deleted'

interface IStoryblokEvent {
  action: IStoryblokEventType
  text: string
  story_id: number
  space_id: number
}

export const isStoryblokEvent = (e: any): e is IStoryblokEvent => {
  if (typeof e !== 'object' || e === null) return false
  if (!('text' in e && typeof e.text === 'string')) return false
  if (!('story_id' in e && typeof e.story_id === 'number')) return false
  if (!('space_id' in e && typeof e.space_id === 'number')) return false
  if (!('action' in e && typeof e.action === 'string')) return false
  if (!['published', 'unpublished', 'deleted'].some((t) => t === e.action))
    return false
  return (e as IStoryblokEvent).text !== undefined
}
