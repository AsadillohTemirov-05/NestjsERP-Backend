import { DocumentStatus } from '../constants/document-status.enum';


export interface BaseDocument {

  status: DocumentStatus;


  created_by: string;          
  created_at: Date;           
  confirmed_by?: string;       
  confirmed_at?: Date;         
  cancelled_by?: string;       
  cancelled_at?: Date;         
  cancellation_reason?: string;
}
