export const adventureWorks =
{
    "entities": [
        {
            "name": "SalesTaxRate",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SalesTaxRateID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxType",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxRate",
                    "dataType": "smallmoney",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PersonCreditCard",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CreditCardID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PersonPhone",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumber",
                    "dataType": "Phone",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PhoneNumberTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesTerritory",
            "schema": "Sales",
            "columns": [
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryRegionCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Group",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesYTD",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesLastYear",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CostYTD",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CostLastYear",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PhoneNumberType",
            "schema": "Person",
            "columns": [
                {
                    "name": "PhoneNumberTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Product",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MakeFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FinishedGoodsFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Color",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SafetyStockLevel",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReorderPoint",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StandardCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ListPrice",
                    "dataType": "money",
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
                    "name": "SizeUnitMeasureCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "WeightUnitMeasureCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Weight",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DaysToManufacture",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductLine",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Class",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Style",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductSubcategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductModelID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SellStartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SellEndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DiscontinuedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesTerritoryHistory",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ScrapReason",
            "schema": "Production",
            "columns": [
                {
                    "name": "ScrapReasonID",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Shift",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "ShiftID",
                    "dataType": "tinyint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StartTime",
                    "dataType": "time",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndTime",
                    "dataType": "time",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductCategory",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ShipMethod",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "ShipMethodID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipBase",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipRate",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductCostHistory",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StandardCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductDescription",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductDescriptionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Description",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ShoppingCartItem",
            "schema": "Sales",
            "columns": [
                {
                    "name": "ShoppingCartItemID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ShoppingCartID",
                    "dataType": "nvarchar",
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
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DateCreated",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductDocument",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "DocumentNode",
                    "dataType": "hierarchyid",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "DatabaseLog",
            "schema": "dbo",
            "columns": [
                {
                    "name": "DatabaseLogID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "PostTime",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DatabaseUser",
                    "dataType": "sysname",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Event",
                    "dataType": "sysname",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Schema",
                    "dataType": "sysname",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Object",
                    "dataType": "sysname",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TSQL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "XmlEvent",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductInventory",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "LocationID",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Shelf",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Bin",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Quantity",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SpecialOffer",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SpecialOfferID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Description",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DiscountPct",
                    "dataType": "smallmoney",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Type",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Category",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MinQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MaxQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ErrorLog",
            "schema": "dbo",
            "columns": [
                {
                    "name": "ErrorLogID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ErrorTime",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UserName",
                    "dataType": "sysname",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorNumber",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorSeverity",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorState",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorProcedure",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorLine",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ErrorMessage",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductListPriceHistory",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ListPrice",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Address",
            "schema": "Person",
            "columns": [
                {
                    "name": "AddressID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "AddressLine1",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AddressLine2",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "City",
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
                    "name": "PostalCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SpatialLocation",
                    "dataType": "geography",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SpecialOfferProduct",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SpecialOfferID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductModel",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductModelID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CatalogDescription",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Instructions",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "AddressType",
            "schema": "Person",
            "columns": [
                {
                    "name": "AddressTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "StateProvince",
            "schema": "Person",
            "columns": [
                {
                    "name": "StateProvinceID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "StateProvinceCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CountryRegionCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "IsOnlyStateProvinceFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductModelIllustration",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductModelID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "IllustrationID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "AWBuildVersion",
            "schema": "dbo",
            "columns": [
                {
                    "name": "SystemInformationID",
                    "dataType": "tinyint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Database Version",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "VersionDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductModelProductDescriptionCulture",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductModelID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ProductDescriptionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CultureID",
                    "dataType": "nchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BillOfMaterials",
            "schema": "Production",
            "columns": [
                {
                    "name": "BillOfMaterialsID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ProductAssemblyID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ComponentID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitMeasureCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BOMLevel",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PerAssemblyQty",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Store",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Demographics",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductPhoto",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductPhotoID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ThumbNailPhoto",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ThumbnailPhotoFileName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LargePhoto",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LargePhotoFileName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductProductPhoto",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ProductPhotoID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Primary",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "TransactionHistory",
            "schema": "Production",
            "columns": [
                {
                    "name": "TransactionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReferenceOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReferenceOrderLineID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionType",
                    "dataType": "nchar",
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
                    "name": "ActualCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductReview",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductReviewID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReviewerName",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReviewDate",
                    "dataType": "datetime",
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
                    "name": "Rating",
                    "dataType": "int",
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
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BusinessEntity",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "TransactionHistoryArchive",
            "schema": "Production",
            "columns": [
                {
                    "name": "TransactionID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReferenceOrderID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReferenceOrderLineID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TransactionType",
                    "dataType": "nchar",
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
                    "name": "ActualCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductSubcategory",
            "schema": "Production",
            "columns": [
                {
                    "name": "ProductSubcategoryID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ProductCategoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BusinessEntityAddress",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "AddressID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "AddressTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ProductVendor",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "AverageLeadTime",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StandardPrice",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastReceiptCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastReceiptDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MinOrderQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MaxOrderQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OnOrderQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitMeasureCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "BusinessEntityContact",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PersonID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ContactTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "UnitMeasure",
            "schema": "Production",
            "columns": [
                {
                    "name": "UnitMeasureCode",
                    "dataType": "nchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Vendor",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "AccountNumber",
                    "dataType": "AccountNumber",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditRating",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PreferredVendorStatus",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ActiveFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PurchasingWebServiceURL",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "ContactType",
            "schema": "Person",
            "columns": [
                {
                    "name": "ContactTypeID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CountryRegionCurrency",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CountryRegionCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "CurrencyCode",
                    "dataType": "nchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CountryRegion",
            "schema": "Person",
            "columns": [
                {
                    "name": "CountryRegionCode",
                    "dataType": "nvarchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "WorkOrder",
            "schema": "Production",
            "columns": [
                {
                    "name": "WorkOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockedQty",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ScrappedQty",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DueDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ScrapReasonID",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PurchaseOrderDetail",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PurchaseOrderDetailID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "DueDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderQty",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LineTotal",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReceivedQty",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "RejectedQty",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StockedQty",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CreditCard",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CreditCardID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "CardType",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CardNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExpMonth",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ExpYear",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Culture",
            "schema": "Production",
            "columns": [
                {
                    "name": "CultureID",
                    "dataType": "nchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "WorkOrderRouting",
            "schema": "Production",
            "columns": [
                {
                    "name": "WorkOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "OperationSequence",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "LocationID",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ScheduledStartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ScheduledEndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ActualStartDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ActualEndDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ActualResourceHrs",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PlannedCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ActualCost",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Currency",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CurrencyCode",
                    "dataType": "nchar",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "PurchaseOrderHeader",
            "schema": "Purchasing",
            "columns": [
                {
                    "name": "PurchaseOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "RevisionNumber",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Status",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EmployeeID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "VendorID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SubTotal",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxAmt",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Freight",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TotalDue",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "CurrencyRate",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CurrencyRateID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "CurrencyRateDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FromCurrencyCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ToCurrencyCode",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AverageRate",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EndOfDayRate",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Customer",
            "schema": "Sales",
            "columns": [
                {
                    "name": "CustomerID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "PersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "StoreID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AccountNumber",
                    "dataType": "varchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Department",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "DepartmentID",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "GroupName",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Document",
            "schema": "Production",
            "columns": [
                {
                    "name": "DocumentNode",
                    "dataType": "hierarchyid",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "DocumentLevel",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Title",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Owner",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FolderFlag",
                    "dataType": "bit",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FileName",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FileExtension",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Revision",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ChangeNumber",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Status",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DocumentSummary",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Document",
                    "dataType": "varbinary",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesOrderDetail",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SalesOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SalesOrderDetailID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "CarrierTrackingNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderQty",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ProductID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SpecialOfferID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPrice",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "UnitPriceDiscount",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LineTotal",
                    "dataType": "numeric",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "EmailAddress",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "EmailAddressID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "EmailAddress",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Employee",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "NationalIDNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LoginID",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrganizationNode",
                    "dataType": "hierarchyid",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrganizationLevel",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "JobTitle",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BirthDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MaritalStatus",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Gender",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "HireDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalariedFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "VacationHours",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SickLeaveHours",
                    "dataType": "smallint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CurrentFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesOrderHeader",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SalesOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "RevisionNumber",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OrderDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "DueDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Status",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "OnlineOrderFlag",
                    "dataType": "Flag",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesOrderNumber",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PurchaseOrderNumber",
                    "dataType": "OrderNumber",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AccountNumber",
                    "dataType": "AccountNumber",
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
                    "name": "SalesPersonID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "BillToAddressID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipToAddressID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ShipMethodID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditCardID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CreditCardApprovalCode",
                    "dataType": "varchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CurrencyRateID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SubTotal",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TaxAmt",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Freight",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "TotalDue",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Comment",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "EmployeeDepartmentHistory",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "DepartmentID",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ShiftID",
                    "dataType": "tinyint",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "StartDate",
                    "dataType": "date",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "EndDate",
                    "dataType": "date",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "EmployeePayHistory",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "RateChangeDate",
                    "dataType": "datetime",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "Rate",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PayFrequency",
                    "dataType": "tinyint",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesOrderHeaderSalesReason",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SalesOrderID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SalesReasonID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesPerson",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "TerritoryID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesQuota",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Bonus",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CommissionPct",
                    "dataType": "smallmoney",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesYTD",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "SalesLastYear",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Illustration",
            "schema": "Production",
            "columns": [
                {
                    "name": "IllustrationID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Diagram",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "JobCandidate",
            "schema": "HumanResources",
            "columns": [
                {
                    "name": "JobCandidateID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Resume",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Location",
            "schema": "Production",
            "columns": [
                {
                    "name": "LocationID",
                    "dataType": "smallint",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "CostRate",
                    "dataType": "smallmoney",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Availability",
                    "dataType": "decimal",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Password",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PasswordHash",
                    "dataType": "varchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "PasswordSalt",
                    "dataType": "varchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesPersonQuotaHistory",
            "schema": "Sales",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "QuotaDate",
                    "dataType": "datetime",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "SalesQuota",
                    "dataType": "money",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "Person",
            "schema": "Person",
            "columns": [
                {
                    "name": "BusinessEntityID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": false
                },
                {
                    "name": "PersonType",
                    "dataType": "nchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "NameStyle",
                    "dataType": "NameStyle",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Title",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "FirstName",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "MiddleName",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "LastName",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Suffix",
                    "dataType": "nvarchar",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "EmailPromotion",
                    "dataType": "int",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "AdditionalContactInfo",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "Demographics",
                    "dataType": "xml",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "rowguid",
                    "dataType": "uniqueidentifier",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        },
        {
            "name": "SalesReason",
            "schema": "Sales",
            "columns": [
                {
                    "name": "SalesReasonID",
                    "dataType": "int",
                    "isPrimaryKey": true,
                    "isIdentity": true
                },
                {
                    "name": "Name",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ReasonType",
                    "dataType": "Name",
                    "isPrimaryKey": false,
                    "isIdentity": false
                },
                {
                    "name": "ModifiedDate",
                    "dataType": "datetime",
                    "isPrimaryKey": false,
                    "isIdentity": false
                }
            ]
        }
    ],
    "relationships": [
        {
            "foreignKeyName": "FK_Customer_SalesTerritory_TerritoryID",
            "entity": "Customer",
            "column": "TerritoryID",
            "referencedEntity": "SalesTerritory",
            "referencedColumn": "TerritoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_SalesTerritory_TerritoryID",
            "entity": "SalesOrderHeader",
            "column": "TerritoryID",
            "referencedEntity": "SalesTerritory",
            "referencedColumn": "TerritoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesPerson_SalesTerritory_TerritoryID",
            "entity": "SalesPerson",
            "column": "TerritoryID",
            "referencedEntity": "SalesTerritory",
            "referencedColumn": "TerritoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesTerritoryHistory_SalesTerritory_TerritoryID",
            "entity": "SalesTerritoryHistory",
            "column": "TerritoryID",
            "referencedEntity": "SalesTerritory",
            "referencedColumn": "TerritoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_StateProvince_SalesTerritory_TerritoryID",
            "entity": "StateProvince",
            "column": "TerritoryID",
            "referencedEntity": "SalesTerritory",
            "referencedColumn": "TerritoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PersonPhone_PhoneNumberType_PhoneNumberTypeID",
            "entity": "PersonPhone",
            "column": "PhoneNumberTypeID",
            "referencedEntity": "PhoneNumberType",
            "referencedColumn": "PhoneNumberTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BillOfMaterials_Product_ProductAssemblyID",
            "entity": "BillOfMaterials",
            "column": "ProductAssemblyID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BillOfMaterials_Product_ComponentID",
            "entity": "BillOfMaterials",
            "column": "ComponentID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductCostHistory_Product_ProductID",
            "entity": "ProductCostHistory",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductDocument_Product_ProductID",
            "entity": "ProductDocument",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductInventory_Product_ProductID",
            "entity": "ProductInventory",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductListPriceHistory_Product_ProductID",
            "entity": "ProductListPriceHistory",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductProductPhoto_Product_ProductID",
            "entity": "ProductProductPhoto",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductReview_Product_ProductID",
            "entity": "ProductReview",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductVendor_Product_ProductID",
            "entity": "ProductVendor",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PurchaseOrderDetail_Product_ProductID",
            "entity": "PurchaseOrderDetail",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ShoppingCartItem_Product_ProductID",
            "entity": "ShoppingCartItem",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SpecialOfferProduct_Product_ProductID",
            "entity": "SpecialOfferProduct",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_TransactionHistory_Product_ProductID",
            "entity": "TransactionHistory",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_WorkOrder_Product_ProductID",
            "entity": "WorkOrder",
            "column": "ProductID",
            "referencedEntity": "Product",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_WorkOrder_ScrapReason_ScrapReasonID",
            "entity": "WorkOrder",
            "column": "ScrapReasonID",
            "referencedEntity": "ScrapReason",
            "referencedColumn": "ScrapReasonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_EmployeeDepartmentHistory_Shift_ShiftID",
            "entity": "EmployeeDepartmentHistory",
            "column": "ShiftID",
            "referencedEntity": "Shift",
            "referencedColumn": "ShiftID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductSubcategory_ProductCategory_ProductCategoryID",
            "entity": "ProductSubcategory",
            "column": "ProductCategoryID",
            "referencedEntity": "ProductCategory",
            "referencedColumn": "ProductCategoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PurchaseOrderHeader_ShipMethod_ShipMethodID",
            "entity": "PurchaseOrderHeader",
            "column": "ShipMethodID",
            "referencedEntity": "ShipMethod",
            "referencedColumn": "ShipMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_ShipMethod_ShipMethodID",
            "entity": "SalesOrderHeader",
            "column": "ShipMethodID",
            "referencedEntity": "ShipMethod",
            "referencedColumn": "ShipMethodID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductModelProductDescriptionCulture_ProductDescription_ProductDescriptionID",
            "entity": "ProductModelProductDescriptionCulture",
            "column": "ProductDescriptionID",
            "referencedEntity": "ProductDescription",
            "referencedColumn": "ProductDescriptionID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SpecialOfferProduct_SpecialOffer_SpecialOfferID",
            "entity": "SpecialOfferProduct",
            "column": "SpecialOfferID",
            "referencedEntity": "SpecialOffer",
            "referencedColumn": "SpecialOfferID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityAddress_Address_AddressID",
            "entity": "BusinessEntityAddress",
            "column": "AddressID",
            "referencedEntity": "Address",
            "referencedColumn": "AddressID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_Address_BillToAddressID",
            "entity": "SalesOrderHeader",
            "column": "BillToAddressID",
            "referencedEntity": "Address",
            "referencedColumn": "AddressID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_Address_ShipToAddressID",
            "entity": "SalesOrderHeader",
            "column": "ShipToAddressID",
            "referencedEntity": "Address",
            "referencedColumn": "AddressID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderDetail_SpecialOfferProduct_SpecialOfferIDProductID",
            "entity": "SalesOrderDetail",
            "column": "SpecialOfferID",
            "referencedEntity": "SpecialOfferProduct",
            "referencedColumn": "SpecialOfferID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderDetail_SpecialOfferProduct_SpecialOfferIDProductID",
            "entity": "SalesOrderDetail",
            "column": "ProductID",
            "referencedEntity": "SpecialOfferProduct",
            "referencedColumn": "ProductID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Product_ProductModel_ProductModelID",
            "entity": "Product",
            "column": "ProductModelID",
            "referencedEntity": "ProductModel",
            "referencedColumn": "ProductModelID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductModelIllustration_ProductModel_ProductModelID",
            "entity": "ProductModelIllustration",
            "column": "ProductModelID",
            "referencedEntity": "ProductModel",
            "referencedColumn": "ProductModelID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductModelProductDescriptionCulture_ProductModel_ProductModelID",
            "entity": "ProductModelProductDescriptionCulture",
            "column": "ProductModelID",
            "referencedEntity": "ProductModel",
            "referencedColumn": "ProductModelID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityAddress_AddressType_AddressTypeID",
            "entity": "BusinessEntityAddress",
            "column": "AddressTypeID",
            "referencedEntity": "AddressType",
            "referencedColumn": "AddressTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Address_StateProvince_StateProvinceID",
            "entity": "Address",
            "column": "StateProvinceID",
            "referencedEntity": "StateProvince",
            "referencedColumn": "StateProvinceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesTaxRate_StateProvince_StateProvinceID",
            "entity": "SalesTaxRate",
            "column": "StateProvinceID",
            "referencedEntity": "StateProvince",
            "referencedColumn": "StateProvinceID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Customer_Store_StoreID",
            "entity": "Customer",
            "column": "StoreID",
            "referencedEntity": "Store",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductProductPhoto_ProductPhoto_ProductPhotoID",
            "entity": "ProductProductPhoto",
            "column": "ProductPhotoID",
            "referencedEntity": "ProductPhoto",
            "referencedColumn": "ProductPhotoID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityAddress_BusinessEntity_BusinessEntityID",
            "entity": "BusinessEntityAddress",
            "column": "BusinessEntityID",
            "referencedEntity": "BusinessEntity",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityContact_BusinessEntity_BusinessEntityID",
            "entity": "BusinessEntityContact",
            "column": "BusinessEntityID",
            "referencedEntity": "BusinessEntity",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Person_BusinessEntity_BusinessEntityID",
            "entity": "Person",
            "column": "BusinessEntityID",
            "referencedEntity": "BusinessEntity",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Store_BusinessEntity_BusinessEntityID",
            "entity": "Store",
            "column": "BusinessEntityID",
            "referencedEntity": "BusinessEntity",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Vendor_BusinessEntity_BusinessEntityID",
            "entity": "Vendor",
            "column": "BusinessEntityID",
            "referencedEntity": "BusinessEntity",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Product_ProductSubcategory_ProductSubcategoryID",
            "entity": "Product",
            "column": "ProductSubcategoryID",
            "referencedEntity": "ProductSubcategory",
            "referencedColumn": "ProductSubcategoryID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BillOfMaterials_UnitMeasure_UnitMeasureCode",
            "entity": "BillOfMaterials",
            "column": "UnitMeasureCode",
            "referencedEntity": "UnitMeasure",
            "referencedColumn": "UnitMeasureCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Product_UnitMeasure_SizeUnitMeasureCode",
            "entity": "Product",
            "column": "SizeUnitMeasureCode",
            "referencedEntity": "UnitMeasure",
            "referencedColumn": "UnitMeasureCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Product_UnitMeasure_WeightUnitMeasureCode",
            "entity": "Product",
            "column": "WeightUnitMeasureCode",
            "referencedEntity": "UnitMeasure",
            "referencedColumn": "UnitMeasureCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductVendor_UnitMeasure_UnitMeasureCode",
            "entity": "ProductVendor",
            "column": "UnitMeasureCode",
            "referencedEntity": "UnitMeasure",
            "referencedColumn": "UnitMeasureCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductVendor_Vendor_BusinessEntityID",
            "entity": "ProductVendor",
            "column": "BusinessEntityID",
            "referencedEntity": "Vendor",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PurchaseOrderHeader_Vendor_VendorID",
            "entity": "PurchaseOrderHeader",
            "column": "VendorID",
            "referencedEntity": "Vendor",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityContact_ContactType_ContactTypeID",
            "entity": "BusinessEntityContact",
            "column": "ContactTypeID",
            "referencedEntity": "ContactType",
            "referencedColumn": "ContactTypeID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_CountryRegionCurrency_CountryRegion_CountryRegionCode",
            "entity": "CountryRegionCurrency",
            "column": "CountryRegionCode",
            "referencedEntity": "CountryRegion",
            "referencedColumn": "CountryRegionCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesTerritory_CountryRegion_CountryRegionCode",
            "entity": "SalesTerritory",
            "column": "CountryRegionCode",
            "referencedEntity": "CountryRegion",
            "referencedColumn": "CountryRegionCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_StateProvince_CountryRegion_CountryRegionCode",
            "entity": "StateProvince",
            "column": "CountryRegionCode",
            "referencedEntity": "CountryRegion",
            "referencedColumn": "CountryRegionCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_WorkOrderRouting_WorkOrder_WorkOrderID",
            "entity": "WorkOrderRouting",
            "column": "WorkOrderID",
            "referencedEntity": "WorkOrder",
            "referencedColumn": "WorkOrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PersonCreditCard_CreditCard_CreditCardID",
            "entity": "PersonCreditCard",
            "column": "CreditCardID",
            "referencedEntity": "CreditCard",
            "referencedColumn": "CreditCardID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_CreditCard_CreditCardID",
            "entity": "SalesOrderHeader",
            "column": "CreditCardID",
            "referencedEntity": "CreditCard",
            "referencedColumn": "CreditCardID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductModelProductDescriptionCulture_Culture_CultureID",
            "entity": "ProductModelProductDescriptionCulture",
            "column": "CultureID",
            "referencedEntity": "Culture",
            "referencedColumn": "CultureID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_CountryRegionCurrency_Currency_CurrencyCode",
            "entity": "CountryRegionCurrency",
            "column": "CurrencyCode",
            "referencedEntity": "Currency",
            "referencedColumn": "CurrencyCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_CurrencyRate_Currency_FromCurrencyCode",
            "entity": "CurrencyRate",
            "column": "FromCurrencyCode",
            "referencedEntity": "Currency",
            "referencedColumn": "CurrencyCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_CurrencyRate_Currency_ToCurrencyCode",
            "entity": "CurrencyRate",
            "column": "ToCurrencyCode",
            "referencedEntity": "Currency",
            "referencedColumn": "CurrencyCode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PurchaseOrderDetail_PurchaseOrderHeader_PurchaseOrderID",
            "entity": "PurchaseOrderDetail",
            "column": "PurchaseOrderID",
            "referencedEntity": "PurchaseOrderHeader",
            "referencedColumn": "PurchaseOrderID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_CurrencyRate_CurrencyRateID",
            "entity": "SalesOrderHeader",
            "column": "CurrencyRateID",
            "referencedEntity": "CurrencyRate",
            "referencedColumn": "CurrencyRateID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_Customer_CustomerID",
            "entity": "SalesOrderHeader",
            "column": "CustomerID",
            "referencedEntity": "Customer",
            "referencedColumn": "CustomerID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_EmployeeDepartmentHistory_Department_DepartmentID",
            "entity": "EmployeeDepartmentHistory",
            "column": "DepartmentID",
            "referencedEntity": "Department",
            "referencedColumn": "DepartmentID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductDocument_Document_DocumentNode",
            "entity": "ProductDocument",
            "column": "DocumentNode",
            "referencedEntity": "Document",
            "referencedColumn": "DocumentNode",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Document_Employee_Owner",
            "entity": "Document",
            "column": "Owner",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_EmployeeDepartmentHistory_Employee_BusinessEntityID",
            "entity": "EmployeeDepartmentHistory",
            "column": "BusinessEntityID",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_EmployeePayHistory_Employee_BusinessEntityID",
            "entity": "EmployeePayHistory",
            "column": "BusinessEntityID",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_JobCandidate_Employee_BusinessEntityID",
            "entity": "JobCandidate",
            "column": "BusinessEntityID",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PurchaseOrderHeader_Employee_EmployeeID",
            "entity": "PurchaseOrderHeader",
            "column": "EmployeeID",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesPerson_Employee_BusinessEntityID",
            "entity": "SalesPerson",
            "column": "BusinessEntityID",
            "referencedEntity": "Employee",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderDetail_SalesOrderHeader_SalesOrderID",
            "entity": "SalesOrderDetail",
            "column": "SalesOrderID",
            "referencedEntity": "SalesOrderHeader",
            "referencedColumn": "SalesOrderID",
            "onDeleteAction": 0,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeaderSalesReason_SalesOrderHeader_SalesOrderID",
            "entity": "SalesOrderHeaderSalesReason",
            "column": "SalesOrderID",
            "referencedEntity": "SalesOrderHeader",
            "referencedColumn": "SalesOrderID",
            "onDeleteAction": 0,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeader_SalesPerson_SalesPersonID",
            "entity": "SalesOrderHeader",
            "column": "SalesPersonID",
            "referencedEntity": "SalesPerson",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesPersonQuotaHistory_SalesPerson_BusinessEntityID",
            "entity": "SalesPersonQuotaHistory",
            "column": "BusinessEntityID",
            "referencedEntity": "SalesPerson",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesTerritoryHistory_SalesPerson_BusinessEntityID",
            "entity": "SalesTerritoryHistory",
            "column": "BusinessEntityID",
            "referencedEntity": "SalesPerson",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Store_SalesPerson_SalesPersonID",
            "entity": "Store",
            "column": "SalesPersonID",
            "referencedEntity": "SalesPerson",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductModelIllustration_Illustration_IllustrationID",
            "entity": "ProductModelIllustration",
            "column": "IllustrationID",
            "referencedEntity": "Illustration",
            "referencedColumn": "IllustrationID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_ProductInventory_Location_LocationID",
            "entity": "ProductInventory",
            "column": "LocationID",
            "referencedEntity": "Location",
            "referencedColumn": "LocationID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_WorkOrderRouting_Location_LocationID",
            "entity": "WorkOrderRouting",
            "column": "LocationID",
            "referencedEntity": "Location",
            "referencedColumn": "LocationID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_BusinessEntityContact_Person_PersonID",
            "entity": "BusinessEntityContact",
            "column": "PersonID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Customer_Person_PersonID",
            "entity": "Customer",
            "column": "PersonID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_EmailAddress_Person_BusinessEntityID",
            "entity": "EmailAddress",
            "column": "BusinessEntityID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Employee_Person_BusinessEntityID",
            "entity": "Employee",
            "column": "BusinessEntityID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_Password_Person_BusinessEntityID",
            "entity": "Password",
            "column": "BusinessEntityID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PersonCreditCard_Person_BusinessEntityID",
            "entity": "PersonCreditCard",
            "column": "BusinessEntityID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_PersonPhone_Person_BusinessEntityID",
            "entity": "PersonPhone",
            "column": "BusinessEntityID",
            "referencedEntity": "Person",
            "referencedColumn": "BusinessEntityID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        },
        {
            "foreignKeyName": "FK_SalesOrderHeaderSalesReason_SalesReason_SalesReasonID",
            "entity": "SalesOrderHeaderSalesReason",
            "column": "SalesReasonID",
            "referencedEntity": "SalesReason",
            "referencedColumn": "SalesReasonID",
            "onDeleteAction": 1,
            "onUpdateAction": 1
        }
    ]
};