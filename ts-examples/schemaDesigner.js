export const test =
{
    "entities": [
        {
            "name": "CustomerTransactions",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerTransactionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InvoiceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AmountExcludingTax",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OutstandingBalance",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FinalizationDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsFinalized",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CustomerCategories_Archive",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerCategoryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "InvoiceLines",
            "schema": "Sales",
            "columns": [
                {
                    "name": "InvoiceLineID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "InvoiceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Description",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PackageTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Quantity",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxRate",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LineProfit",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExtendedPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Invoices",
            "schema": "Sales",
            "columns": [
                {
                    "name": "InvoiceID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BillToCustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AccountsPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalespersonPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PackedByPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InvoiceDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerPurchaseOrderNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsCreditNote",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditNoteReason",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Comments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryInstructions",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TotalDryItems",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TotalChillerItems",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryRun",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RunPosition",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReturnedDeliveryData",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ConfirmedDeliveryTime",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ConfirmedReceivedBy",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "OrderLines",
            "schema": "Sales",
            "columns": [
                {
                    "name": "OrderLineID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "OrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Description",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PackageTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Quantity",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxRate",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PickedQuantity",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PickingCompletedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Orders",
            "schema": "Sales",
            "columns": [
                {
                    "name": "OrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalespersonPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PickedByPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BackorderOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExpectedDeliveryDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerPurchaseOrderNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsUndersupplyBackordered",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Comments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryInstructions",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PickingCompletedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Customers_Archive",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BillToCustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BuyingGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PrimaryContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AlternateContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditLimit",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AccountOpenedDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StandardDiscountPercentage",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsStatementSent",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsOnCreditHold",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryRun",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RunPosition",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "WebsiteURL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SpecialDeals",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SpecialDealID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BuyingGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DealDescription",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DiscountAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DiscountPercentage",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CustomerCategories",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CustomerCategoryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BuyingGroups",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BuyingGroupID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "BuyingGroupName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Customers",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CustomerName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BillToCustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BuyingGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PrimaryContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AlternateContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditLimit",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AccountOpenedDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StandardDiscountPercentage",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsStatementSent",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsOnCreditHold",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryRun",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RunPosition",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "WebsiteURL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ColdRoomTemperatures_Archive",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "ColdRoomTemperatureID",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ColdRoomSensorNumber",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RecordedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Temperature",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockItemHoldings",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "QuantityOnHand",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BinLocation",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastStocktakeQuantity",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastCostPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReorderLevel",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TargetStockLevel",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PackageTypes_Archive",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "PackageTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PackageTypeName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "VehicleTemperatures",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "VehicleTemperatureID",
                    "dataType": "bigint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "VehicleRegistration",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ChillerSensorNumber",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RecordedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Temperature",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FullSensorData",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsCompressed",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CompressedSensorData",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockItemStockGroups",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockItemStockGroupID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ColdRoomTemperatures",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "ColdRoomTemperatureID",
                    "dataType": "bigint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ColdRoomSensorNumber",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RecordedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Temperature",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Colors_Archive",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "ColorID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ColorName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockGroups_Archive",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockGroupName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockItemTransactions",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockItemTransactionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InvoiceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionOccurredWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Quantity",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockItems_Archive",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockItemName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ColorID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPackageID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OuterPackageID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Brand",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Size",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LeadTimeDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "QuantityPerOuter",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsChillerStock",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Barcode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxRate",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RecommendedRetailPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TypicalWeightPerUnit",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MarketingComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Photo",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomFields",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Tags",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SearchDetails",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PackageTypes",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "PackageTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PackageTypeName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StateProvinces",
            "schema": "Application",
            "columns": [
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesTerritory",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Border",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Countries",
            "schema": "Application",
            "columns": [
                {
                    "name": "CountryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CountryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FormalName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsoAlpha3Code",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsoNumericCode",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryType",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Continent",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Region",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Subregion",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Border",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Cities",
            "schema": "Application",
            "columns": [
                {
                    "name": "CityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CityName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Location",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SupplierCategories",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "SupplierCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SupplierCategoryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Suppliers",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SupplierName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PrimaryContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AlternateContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierReference",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountBranch",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankInternationalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "WebsiteURL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Colors",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "ColorID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ColorName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockGroups",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockGroupID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StockGroupName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StockItems",
            "schema": "Warehouse",
            "columns": [
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StockItemName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ColorID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPackageID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OuterPackageID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Brand",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Size",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LeadTimeDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "QuantityPerOuter",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsChillerStock",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Barcode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxRate",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RecommendedRetailPrice",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TypicalWeightPerUnit",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MarketingComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Photo",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomFields",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Tags",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SearchDetails",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "TransactionTypes_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "TransactionTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionTypeName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "People_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "PersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FullName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PreferredName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SearchName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsPermittedToLogon",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LogonName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsExternalLogonProvider",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "HashedPassword",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsSystemUser",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsEmployee",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsSalesperson",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UserPreferences",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EmailAddress",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Photo",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomFields",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OtherLanguages",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "DeliveryMethods_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "DeliveryMethods",
            "schema": "Application",
            "columns": [
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Countries_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "CountryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FormalName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsoAlpha3Code",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsoNumericCode",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryType",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Continent",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Region",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Subregion",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Border",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StateProvinces_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesTerritory",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Border",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PaymentMethods_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "PaymentMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentMethodName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "People",
            "schema": "Application",
            "columns": [
                {
                    "name": "PersonID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "FullName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PreferredName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SearchName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsPermittedToLogon",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LogonName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsExternalLogonProvider",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "HashedPassword",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsSystemUser",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsEmployee",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsSalesperson",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UserPreferences",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EmailAddress",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Photo",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CustomFields",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OtherLanguages",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "TransactionTypes",
            "schema": "Application",
            "columns": [
                {
                    "name": "TransactionTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "TransactionTypeName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PaymentMethods",
            "schema": "Application",
            "columns": [
                {
                    "name": "PaymentMethodID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PaymentMethodName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SystemParameters",
            "schema": "Application",
            "columns": [
                {
                    "name": "SystemParameterID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ApplicationSettings",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Cities_Archive",
            "schema": "Application",
            "columns": [
                {
                    "name": "CityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CityName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Location",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LatestRecordedPopulation",
                    "dataType": "bigint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PurchaseOrderLines",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "PurchaseOrderLineID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockItemID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderedOuters",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Description",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReceivedOuters",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PackageTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExpectedUnitPricePerOuter",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastReceiptDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsOrderLineFinalized",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SupplierTransactions",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "SupplierTransactionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionTypeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierInvoiceNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AmountExcludingTax",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionAmount",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OutstandingBalance",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FinalizationDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsFinalized",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SupplierCategories_Archive",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "SupplierCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierCategoryName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Suppliers_Archive",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PrimaryContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AlternateContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalCityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierReference",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountBranch",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankAccountNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BankInternationalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PaymentDays",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FaxNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "WebsiteURL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalAddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PostalPostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PurchaseOrders",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SupplierID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DeliveryMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ContactPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExpectedDeliveryDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SupplierReference",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsOrderFinalized",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Comments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "InternalComments",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedWhen",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BuyingGroups_Archive",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BuyingGroupID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BuyingGroupName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastEditedBy",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidFrom",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ValidTo",
                    "dataType": "datetime2",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        }
    ],
    "relationships": [
        {
            "foreignKeyName": "FK_Sales_CustomerTransactions_InvoiceID_Sales_Invoices",
            "entity": "CustomerTransactions",
            "column": "InvoiceID",
            "referencedEntity": "Invoices",
            "referencedColumn": "InvoiceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_InvoiceLines_InvoiceID_Sales_Invoices",
            "entity": "InvoiceLines",
            "column": "InvoiceID",
            "referencedEntity": "Invoices",
            "referencedColumn": "InvoiceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_InvoiceID_Sales_Invoices",
            "entity": "StockItemTransactions",
            "column": "InvoiceID",
            "referencedEntity": "Invoices",
            "referencedColumn": "InvoiceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_OrderID_Sales_Orders",
            "entity": "Invoices",
            "column": "OrderID",
            "referencedEntity": "Orders",
            "referencedColumn": "OrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_OrderLines_OrderID_Sales_Orders",
            "entity": "OrderLines",
            "column": "OrderID",
            "referencedEntity": "Orders",
            "referencedColumn": "OrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_BackorderOrderID_Sales_Orders",
            "entity": "Orders",
            "column": "BackorderOrderID",
            "referencedEntity": "Orders",
            "referencedColumn": "OrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_CustomerCategoryID_Sales_CustomerCategories",
            "entity": "SpecialDeals",
            "column": "CustomerCategoryID",
            "referencedEntity": "CustomerCategories",
            "referencedColumn": "CustomerCategoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_CustomerCategoryID_Sales_CustomerCategories",
            "entity": "Customers",
            "column": "CustomerCategoryID",
            "referencedEntity": "CustomerCategories",
            "referencedColumn": "CustomerCategoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_BuyingGroupID_Sales_BuyingGroups",
            "entity": "SpecialDeals",
            "column": "BuyingGroupID",
            "referencedEntity": "BuyingGroups",
            "referencedColumn": "BuyingGroupID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_BuyingGroupID_Sales_BuyingGroups",
            "entity": "Customers",
            "column": "BuyingGroupID",
            "referencedEntity": "BuyingGroups",
            "referencedColumn": "BuyingGroupID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_CustomerTransactions_CustomerID_Sales_Customers",
            "entity": "CustomerTransactions",
            "column": "CustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_BillToCustomerID_Sales_Customers",
            "entity": "Invoices",
            "column": "BillToCustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_CustomerID_Sales_Customers",
            "entity": "Invoices",
            "column": "CustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_CustomerID_Sales_Customers",
            "entity": "Orders",
            "column": "CustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_CustomerID_Sales_Customers",
            "entity": "SpecialDeals",
            "column": "CustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_BillToCustomerID_Sales_Customers",
            "entity": "Customers",
            "column": "BillToCustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_CustomerID_Sales_Customers",
            "entity": "StockItemTransactions",
            "column": "CustomerID",
            "referencedEntity": "Customers",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrderLines_PackageTypeID_Warehouse_PackageTypes",
            "entity": "PurchaseOrderLines",
            "column": "PackageTypeID",
            "referencedEntity": "PackageTypes",
            "referencedColumn": "PackageTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_InvoiceLines_PackageTypeID_Warehouse_PackageTypes",
            "entity": "InvoiceLines",
            "column": "PackageTypeID",
            "referencedEntity": "PackageTypes",
            "referencedColumn": "PackageTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_OrderLines_PackageTypeID_Warehouse_PackageTypes",
            "entity": "OrderLines",
            "column": "PackageTypeID",
            "referencedEntity": "PackageTypes",
            "referencedColumn": "PackageTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItems_OuterPackageID_Warehouse_PackageTypes",
            "entity": "StockItems",
            "column": "OuterPackageID",
            "referencedEntity": "PackageTypes",
            "referencedColumn": "PackageTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItems_UnitPackageID_Warehouse_PackageTypes",
            "entity": "StockItems",
            "column": "UnitPackageID",
            "referencedEntity": "PackageTypes",
            "referencedColumn": "PackageTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_Cities_StateProvinceID_Application_StateProvinces",
            "entity": "Cities",
            "column": "StateProvinceID",
            "referencedEntity": "StateProvinces",
            "referencedColumn": "StateProvinceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_StateProvinces_CountryID_Application_Countries",
            "entity": "StateProvinces",
            "column": "CountryID",
            "referencedEntity": "Countries",
            "referencedColumn": "CountryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_SystemParameters_PostalCityID_Application_Cities",
            "entity": "SystemParameters",
            "column": "PostalCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_SystemParameters_DeliveryCityID_Application_Cities",
            "entity": "SystemParameters",
            "column": "DeliveryCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_DeliveryCityID_Application_Cities",
            "entity": "Suppliers",
            "column": "DeliveryCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_PostalCityID_Application_Cities",
            "entity": "Suppliers",
            "column": "PostalCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_DeliveryCityID_Application_Cities",
            "entity": "Customers",
            "column": "DeliveryCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_PostalCityID_Application_Cities",
            "entity": "Customers",
            "column": "PostalCityID",
            "referencedEntity": "Cities",
            "referencedColumn": "CityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_SupplierCategoryID_Purchasing_SupplierCategories",
            "entity": "Suppliers",
            "column": "SupplierCategoryID",
            "referencedEntity": "SupplierCategories",
            "referencedColumn": "SupplierCategoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierTransactions_SupplierID_Purchasing_Suppliers",
            "entity": "SupplierTransactions",
            "column": "SupplierID",
            "referencedEntity": "Suppliers",
            "referencedColumn": "SupplierID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrders_SupplierID_Purchasing_Suppliers",
            "entity": "PurchaseOrders",
            "column": "SupplierID",
            "referencedEntity": "Suppliers",
            "referencedColumn": "SupplierID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_SupplierID_Purchasing_Suppliers",
            "entity": "StockItemTransactions",
            "column": "SupplierID",
            "referencedEntity": "Suppliers",
            "referencedColumn": "SupplierID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItems_SupplierID_Purchasing_Suppliers",
            "entity": "StockItems",
            "column": "SupplierID",
            "referencedEntity": "Suppliers",
            "referencedColumn": "SupplierID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItems_ColorID_Warehouse_Colors",
            "entity": "StockItems",
            "column": "ColorID",
            "referencedEntity": "Colors",
            "referencedColumn": "ColorID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_StockGroupID_Warehouse_StockGroups",
            "entity": "SpecialDeals",
            "column": "StockGroupID",
            "referencedEntity": "StockGroups",
            "referencedColumn": "StockGroupID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemStockGroups_StockGroupID_Warehouse_StockGroups",
            "entity": "StockItemStockGroups",
            "column": "StockGroupID",
            "referencedEntity": "StockGroups",
            "referencedColumn": "StockGroupID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrderLines_StockItemID_Warehouse_StockItems",
            "entity": "PurchaseOrderLines",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_InvoiceLines_StockItemID_Warehouse_StockItems",
            "entity": "InvoiceLines",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_OrderLines_StockItemID_Warehouse_StockItems",
            "entity": "OrderLines",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_StockItemID_Warehouse_StockItems",
            "entity": "SpecialDeals",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "PKFK_Warehouse_StockItemHoldings_StockItemID_Warehouse_StockItems",
            "entity": "StockItemHoldings",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemStockGroups_StockItemID_Warehouse_StockItems",
            "entity": "StockItemStockGroups",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_StockItemID_Warehouse_StockItems",
            "entity": "StockItemTransactions",
            "column": "StockItemID",
            "referencedEntity": "StockItems",
            "referencedColumn": "StockItemID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_DeliveryMethodID_Application_DeliveryMethods",
            "entity": "Suppliers",
            "column": "DeliveryMethodID",
            "referencedEntity": "DeliveryMethods",
            "referencedColumn": "DeliveryMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrders_DeliveryMethodID_Application_DeliveryMethods",
            "entity": "PurchaseOrders",
            "column": "DeliveryMethodID",
            "referencedEntity": "DeliveryMethods",
            "referencedColumn": "DeliveryMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_DeliveryMethodID_Application_DeliveryMethods",
            "entity": "Invoices",
            "column": "DeliveryMethodID",
            "referencedEntity": "DeliveryMethods",
            "referencedColumn": "DeliveryMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_DeliveryMethodID_Application_DeliveryMethods",
            "entity": "Customers",
            "column": "DeliveryMethodID",
            "referencedEntity": "DeliveryMethods",
            "referencedColumn": "DeliveryMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_StateProvinces_Application_People",
            "entity": "StateProvinces",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_Countries_Application_People",
            "entity": "Countries",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_DeliveryMethods_Application_People",
            "entity": "DeliveryMethods",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_People_Application_People",
            "entity": "People",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_TransactionTypes_Application_People",
            "entity": "TransactionTypes",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_PaymentMethods_Application_People",
            "entity": "PaymentMethods",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_Cities_Application_People",
            "entity": "Cities",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Application_SystemParameters_Application_People",
            "entity": "SystemParameters",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrderLines_Application_People",
            "entity": "PurchaseOrderLines",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierCategories_Application_People",
            "entity": "SupplierCategories",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierTransactions_Application_People",
            "entity": "SupplierTransactions",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_PrimaryContactPersonID_Application_People",
            "entity": "Suppliers",
            "column": "PrimaryContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_Application_People",
            "entity": "Suppliers",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_Suppliers_AlternateContactPersonID_Application_People",
            "entity": "Suppliers",
            "column": "AlternateContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrders_ContactPersonID_Application_People",
            "entity": "PurchaseOrders",
            "column": "ContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrders_Application_People",
            "entity": "PurchaseOrders",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_CustomerTransactions_Application_People",
            "entity": "CustomerTransactions",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_InvoiceLines_Application_People",
            "entity": "InvoiceLines",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_Application_People",
            "entity": "Invoices",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_PackedByPersonID_Application_People",
            "entity": "Invoices",
            "column": "PackedByPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_ContactPersonID_Application_People",
            "entity": "Invoices",
            "column": "ContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_SalespersonPersonID_Application_People",
            "entity": "Invoices",
            "column": "SalespersonPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Invoices_AccountsPersonID_Application_People",
            "entity": "Invoices",
            "column": "AccountsPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_OrderLines_Application_People",
            "entity": "OrderLines",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_ContactPersonID_Application_People",
            "entity": "Orders",
            "column": "ContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_SalespersonPersonID_Application_People",
            "entity": "Orders",
            "column": "SalespersonPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_PickedByPersonID_Application_People",
            "entity": "Orders",
            "column": "PickedByPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Orders_Application_People",
            "entity": "Orders",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_SpecialDeals_Application_People",
            "entity": "SpecialDeals",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_CustomerCategories_Application_People",
            "entity": "CustomerCategories",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_BuyingGroups_Application_People",
            "entity": "BuyingGroups",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_Application_People",
            "entity": "Customers",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_AlternateContactPersonID_Application_People",
            "entity": "Customers",
            "column": "AlternateContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_Customers_PrimaryContactPersonID_Application_People",
            "entity": "Customers",
            "column": "PrimaryContactPersonID",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemHoldings_Application_People",
            "entity": "StockItemHoldings",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_Colors_Application_People",
            "entity": "Colors",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemStockGroups_Application_People",
            "entity": "StockItemStockGroups",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockGroups_Application_People",
            "entity": "StockGroups",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_Application_People",
            "entity": "StockItemTransactions",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItems_Application_People",
            "entity": "StockItems",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_PackageTypes_Application_People",
            "entity": "PackageTypes",
            "column": "LastEditedBy",
            "referencedEntity": "People",
            "referencedColumn": "PersonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierTransactions_TransactionTypeID_Application_TransactionTypes",
            "entity": "SupplierTransactions",
            "column": "TransactionTypeID",
            "referencedEntity": "TransactionTypes",
            "referencedColumn": "TransactionTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_CustomerTransactions_TransactionTypeID_Application_TransactionTypes",
            "entity": "CustomerTransactions",
            "column": "TransactionTypeID",
            "referencedEntity": "TransactionTypes",
            "referencedColumn": "TransactionTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_TransactionTypeID_Application_TransactionTypes",
            "entity": "StockItemTransactions",
            "column": "TransactionTypeID",
            "referencedEntity": "TransactionTypes",
            "referencedColumn": "TransactionTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierTransactions_PaymentMethodID_Application_PaymentMethods",
            "entity": "SupplierTransactions",
            "column": "PaymentMethodID",
            "referencedEntity": "PaymentMethods",
            "referencedColumn": "PaymentMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Sales_CustomerTransactions_PaymentMethodID_Application_PaymentMethods",
            "entity": "CustomerTransactions",
            "column": "PaymentMethodID",
            "referencedEntity": "PaymentMethods",
            "referencedColumn": "PaymentMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_PurchaseOrderLines_PurchaseOrderID_Purchasing_PurchaseOrders",
            "entity": "PurchaseOrderLines",
            "column": "PurchaseOrderID",
            "referencedEntity": "PurchaseOrders",
            "referencedColumn": "PurchaseOrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Purchasing_SupplierTransactions_PurchaseOrderID_Purchasing_PurchaseOrders",
            "entity": "SupplierTransactions",
            "column": "PurchaseOrderID",
            "referencedEntity": "PurchaseOrders",
            "referencedColumn": "PurchaseOrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Warehouse_StockItemTransactions_PurchaseOrderID_Purchasing_PurchaseOrders",
            "entity": "StockItemTransactions",
            "column": "PurchaseOrderID",
            "referencedEntity": "PurchaseOrders",
            "referencedColumn": "PurchaseOrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        }
    ]
}
