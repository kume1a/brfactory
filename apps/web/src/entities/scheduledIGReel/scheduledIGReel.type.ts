export type ScheduledIGReel = {
  id: string;
  created: string;
  updated: string;
  startAt: string;
  intervalInSeconds: number;
  title: string;
  caption: string;
  igAccount: string;
};

export type CreateScheduledIGReelInput = Pick<
  ScheduledIGReel,
  'startAt' | 'intervalInSeconds' | 'title' | 'caption'
>;

export type UpdateScheduledIGReelInput = Partial<CreateScheduledIGReelInput>;
