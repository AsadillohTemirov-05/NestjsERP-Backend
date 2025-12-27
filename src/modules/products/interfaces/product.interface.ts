import { ProductTrackingType } from "src/common/constants/tracking-type.enum";
import { AuditFields } from "src/common/interfaces/audit-fields.interface";


/**
 * ERP Product Interface
 * ----------------------
 * This interface represents a MASTER DATA entity.
 * It must NOT contain stock, pricing, or transactional data.
 */
export interface Product {
  /** Basic identification */
  id?: string;
  name: string;
  sku: string;
  unit_of_measure: string;

  /** Inventory tracking logic */
  tracking_type: ProductTrackingType;

  /** Variant system */
  is_variant_parent: boolean;
  parent_product_id?: string | null;
  variant_attributes?: Record<string, string>;

  /** ERP lifecycle flags */
  is_active: boolean;
  is_deleted: boolean;

  /** Audit information */
  audit: AuditFields;
}
