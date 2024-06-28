type RouteProps = {
    title: string;
    component: any;
    url: string;
    exact: boolean;
    isPrivate: boolean;
    children?: RouteProps[];
    isIndex?: boolean;
  };
  
  export type Dict<T> = {
    [key: string]: T;
  };
  
  type PaginationType = {
    take: number;
    offset: number;
  };
  
  export interface ActionResult {
    type: string;
    payload?: any;
  }
  
  type MayHaveIdType = {
    id?: string;
  };
  
  type CriteriaResultType<T extends MayHaveIdType> = {
    result: T[];
    criteria: CriteriaType;
    resultCount: number;
  };
  
  type CriteriaType = {
    filter: Dict<string>;
    paginate: PaginationType;
  };
  // Redux
  type TaskPayloadType<T> = {
    id: string;
    data: T;
  };
  
  type UserRegistrationPayloadType = {
    requestId: string;
    firstName: string;
    lastName?: string;
    password: string;
  };
  
  export type RootState = ReturnType<typeof store.getState>;
  

  type ProcessingState = {
  status: ProcessingType;
  payload?: any;
  result?: any;
  message?: string;
};

type TrackingMapType = {
  [id: string]: TrackingTaskType;
};

type TrackingTaskType = {
  id: string;
  success: Function;
  error: Function;
};

type UserReducerStateType = {
  error?: FriendlyError;
  token?: string;
  currentUserId?: string;
  currentUser?: User;
};