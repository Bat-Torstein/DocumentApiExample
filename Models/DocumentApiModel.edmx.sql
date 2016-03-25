
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 03/25/2016 14:05:43
-- Generated from EDMX file: C:\git\DocumentApiExample\Models\DocumentApiModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Document];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_DocumentMeta_DocumentCollection]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[DocumentMeta] DROP CONSTRAINT [FK_DocumentMeta_DocumentCollection];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[DocumentCollection]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DocumentCollection];
GO
IF OBJECT_ID(N'[dbo].[DocumentContent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DocumentContent];
GO
IF OBJECT_ID(N'[dbo].[DocumentMeta]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DocumentMeta];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'DocumentMeta'
CREATE TABLE [dbo].[DocumentMeta] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FileName] nvarchar(max)  NOT NULL,
    [UploadTime] datetime  NOT NULL,
    [DeleteTime] datetime  NULL,
    [CollectionId] int  NOT NULL,
    [Size] int  NULL
);
GO

-- Creating table 'DocumentCollection'
CREATE TABLE [dbo].[DocumentCollection] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nchar(64)  NOT NULL,
    [DeleteTime] datetime  NULL
);
GO

-- Creating table 'DocumentContent'
CREATE TABLE [dbo].[DocumentContent] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RowGuid] uniqueidentifier  NOT NULL,
    [Data] varbinary(max)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'DocumentMeta'
ALTER TABLE [dbo].[DocumentMeta]
ADD CONSTRAINT [PK_DocumentMeta]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'DocumentCollection'
ALTER TABLE [dbo].[DocumentCollection]
ADD CONSTRAINT [PK_DocumentCollection]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'DocumentContent'
ALTER TABLE [dbo].[DocumentContent]
ADD CONSTRAINT [PK_DocumentContent]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [CollectionId] in table 'DocumentMeta'
ALTER TABLE [dbo].[DocumentMeta]
ADD CONSTRAINT [FK_DocumentMeta_DocumentCollection]
    FOREIGN KEY ([CollectionId])
    REFERENCES [dbo].[DocumentCollection]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_DocumentMeta_DocumentCollection'
CREATE INDEX [IX_FK_DocumentMeta_DocumentCollection]
ON [dbo].[DocumentMeta]
    ([CollectionId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------