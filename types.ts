
export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';
export type Priority = 'Low' | 'Medium' | 'High';

export interface PlanItem {
  id: string;
  course: string;
  topic: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Translation {
  title: string;
  subtitle: string;
  heroStart: string;
  heroTimer: string;
  badgeWeekly: string;
  badgePomodoro: string;
  badgeTasks: string;
  plannerTitle: string;
  plannerCourse: string;
  plannerTopic: string;
  plannerDeadline: string;
  plannerPriority: string;
  plannerAdd: string;
  priorityLow: string;
  priorityMed: string;
  priorityHigh: string;
  timerTitle: string;
  timerSessions: string;
  timerStart: string;
  timerPause: string;
  timerReset: string;
  todoTitle: string;
  todoAdd: string;
  todoAll: string;
  todoActive: string;
  todoDone: string;
  todoClear: string;
  tipsTitle: string;
  contactTitle: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSend: string;
  contactSuccess: string;
  todayGreeting: string;
  footerMadeWith: string;
}
