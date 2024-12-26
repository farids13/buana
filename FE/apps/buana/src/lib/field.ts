/**
 * Documentation for field.ts
 * This file contains type definitions and interfaces used for form configuration
 * 
 * Main features:
 * - Defines supported data types (string, number, date, etc)
 * - Field validation configuration
 * - Table relationship settings
 * - Field display configuration in forms
 * 
 * @module field
 */

// Interface for supported data types
// Defines data types that can be used in forms
// Available types:
// - string: for text input
// - number: for numeric input
// - date: for date input
// - boolean: for checkbox/toggle
// - select: for dropdown/combobox
export type FieldType = 'string' | 'number' | 'date' | 'boolean' | 'select'

// Interface for basic validation
// Contains validation rules that can be applied to fields
export interface IValidation {
  required?: boolean  // Indicates field is required
  min?: number       // Minimum allowed value
  max?: number       // Maximum allowed value
  pattern?: RegExp   // Regex pattern for format validation
  message?: string   // Error message to display
}

// Interface for references/relationships
// Used to define relationships between tables
export interface IReference {
  table: string      // Referenced table name
  field: string      // Key field in reference table
  displayField: string // Field shown to user
}

// Main interface for fields
// Complete configuration for a field in a form
export interface IField {
  field: string      // Field/column name in database
  type: FieldType    // Field data type
  label: string      // Label shown to UI
  validation?: IValidation   // Field validation rules
  reference?: IReference    // Relationship configuration if any
  default?: any            // Default field value
  options?: { label: string; value: any }[] // Options for select type fields
}