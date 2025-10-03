-- Banco
CREATE DATABASE IF NOT EXISTS turismojp
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE turismojp;

-- Tabela: users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id            CHAR(26)     NOT NULL,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_active     TINYINT(1)   NOT NULL DEFAULT 1,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: sessions
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id         CHAR(26)   NOT NULL,
  user_id    CHAR(26)   NOT NULL,
  token      CHAR(64)   NOT NULL,
  expires_at DATETIME   NOT NULL,
  revoked    TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_sessions_token (token),
  KEY idx_sessions_user (user_id),
  KEY idx_sessions_expires (expires_at),
  CONSTRAINT fk_sessions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: businesses (lojas)
DROP TABLE IF EXISTS businesses;
CREATE TABLE businesses (
  id              CHAR(26)      NOT NULL,
  owner_id        CHAR(26)      NOT NULL,
  nome            VARCHAR(160)  NOT NULL,
  tipo            VARCHAR(60)   NOT NULL,         -- Ex.: Restaurante, Serviço
  bairro          VARCHAR(80)   NOT NULL,
  descricao       TEXT          NOT NULL,
  imagem          VARCHAR(500)  NOT NULL,
  contato         VARCHAR(160)  NULL,             -- WhatsApp/E-mail/Telefone
  pagamento_url   VARCHAR(500)  NULL,
  google_maps_url VARCHAR(500)  NULL,
  latitude        DECIMAL(10,7) NULL,
  longitude       DECIMAL(10,7) NULL,
  has_location    TINYINT(1)    NOT NULL DEFAULT 0,
  views           INT           NOT NULL DEFAULT 0,
  is_active       TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_business_owner (owner_id),
  KEY idx_business_tipo (tipo),
  KEY idx_business_bairro (bairro),
  KEY idx_business_loc (latitude, longitude),
  CONSTRAINT fk_business_owner
    FOREIGN KEY (owner_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
  -- Se quiser ENFORCE uma loja por usuário, descomente a linha abaixo:
  -- , UNIQUE KEY uk_business_owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: products (catálogo da loja)
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id          CHAR(26)      NOT NULL,
  business_id CHAR(26)      NOT NULL,
  owner_id    CHAR(26)      NOT NULL,
  tipo        VARCHAR(40)   NOT NULL DEFAULT 'Produto', -- Produto/Serviço
  nome        VARCHAR(160)  NOT NULL,
  preco       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  descricao   TEXT          NULL,
  imagem      VARCHAR(500)  NULL,
  info        TEXT          NULL,
  is_active   TINYINT(1)    NOT NULL DEFAULT 1,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_prod_business (business_id),
  KEY idx_prod_owner (owner_id),
  KEY idx_prod_tipo (tipo),
  CONSTRAINT fk_product_business
    FOREIGN KEY (business_id) REFERENCES businesses(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_product_owner
    FOREIGN KEY (owner_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: password_resets (esqueci a senha)
DROP TABLE IF EXISTS password_resets;
CREATE TABLE password_resets (
  id         CHAR(26)   NOT NULL,
  user_id    CHAR(26)   NOT NULL,
  token      CHAR(64)   NOT NULL,
  expires_at DATETIME   NOT NULL,
  used       TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_reset_token (token),
  KEY idx_reset_user (user_id),
  KEY idx_reset_expires (expires_at),
  CONSTRAINT fk_reset_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela: map_pois (pontos do mapa editoriais/extra)
DROP TABLE IF EXISTS map_pois;
CREATE TABLE map_pois (
  id              CHAR(26)      NOT NULL,
  title           VARCHAR(160)  NOT NULL,
  tipo            VARCHAR(60)   NOT NULL,
  bairro          VARCHAR(80)   NOT NULL,
  descricao       TEXT          NULL,
  imagem          VARCHAR(500)  NULL,
  google_maps_url VARCHAR(500)  NULL,
  latitude        DECIMAL(10,7) NULL,
  longitude       DECIMAL(10,7) NULL,
  is_active       TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_poi_tipo (tipo),
  KEY idx_poi_bairro (bairro),
  KEY idx_poi_loc (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


