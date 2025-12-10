export interface Concert {
  id: string;                    
  type: string;                 
  score?: number;                
  name: string;                  
  lifeSpan?: {                    
    begin?: string;              
    end?: string;                 
  };
  time?: string;      
}
