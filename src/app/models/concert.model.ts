export interface Concert {
  id: string;                    
  type: string;                 
  score?: number;                
  name: string;                  
  ["life-span"]?: {                    
    begin?: string;              
    end?: string;                 
  };
  time?: string;   
  relations: {
    type: string;
    artist?: {
      id: string;
      name: string;
      sortName?: string;
      disambiguation?: string;
    };
    place?: {
      id: string;
      name: string;
    };
  }[];
} 

