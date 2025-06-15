PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO Product
VALUES(
        1,
        'Jus de Pomme Bio (1L)',
        'Jus de pomme frais pressé à froid, 100% naturel sans sucre ajouté. Riche en vitamines C et antioxydants. Provenance France.',
        4.990000000000000213,
        'https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        2,
        'Jus de Banane (500ml)',
        'Jus de banane onctueux et nutritif, source de potassium et de fibres. Parfait pour les sportifs et le petit-déjeuner.',
        3.490000000000000213,
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'
    );
INSERT INTO Product
VALUES(
        3,
        'Jus de Carotte Bio (750ml)',
        'Jus de carotte bio riche en bêta-carotène, excellent pour la santé des yeux et de la peau. Goût doux et sucré.',
        3.990000000000000213,
        'https://plus.unsplash.com/premium_photo-1726842349081-86a2b7c28bee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        4,
        'Jus d''Orange Fraîche (1L)',
        'Jus d''orange fraîchement pressé le matin même, plein de vitamine C pour booster votre système immunitaire.',
        5.490000000000000213,
        'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400'
    );
INSERT INTO Product
VALUES(
        5,
        'Jus de Raisin Rouge (500ml)',
        'Jus de raisin rouge bio, riche en antioxydants et en polyphénols. Goût authentique du terroir français.',
        4.290000000000000035,
        'https://vitaality.fr/wp-content/uploads/2015/06/jus-de-raisin-21.jpg'
    );
INSERT INTO Product
VALUES(
        6,
        'Smoothie Vert Détox (400ml)',
        'Smoothie vert détox avec épinards, pomme, concombre et citron vert. Parfait pour une cure detox matinale.',
        6.990000000000000213,
        'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400'
    );
INSERT INTO Product
VALUES(
        7,
        'Jus de Fraise Artisanal (750ml)',
        'Jus de fraise artisanal de Périgord, doux et parfumé. Riche en vitamine C et saveurs estivales.',
        5.990000000000000213,
        'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=400'
    );
INSERT INTO Product
VALUES(
        8,
        'Jus de Citron Pur (250ml)',
        'Jus de citron pur et concentré de Menton. Idéal pour assaisonner ou préparer des boissons rafraîchissantes.',
        2.490000000000000213,
        'https://images.unsplash.com/photo-1679692917358-09f2faf7f2c3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        9,
        'Jus d''Ananas Tropical (1L)',
        'Jus d''ananas 100% pur, sucré et vitaminé. Transport instantané sous les tropiques à chaque gorgée.',
        4.790000000000000035,
        'https://images.unsplash.com/photo-1607644536940-6c300b5784c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        10,
        'Jus de Pamplemousse Rose (750ml)',
        'Jus de pamplemousse rose de Floride, légèrement acidulé et rafraîchissant. Riche en vitamine C et lycopène.',
        4.490000000000000213,
        'https://plus.unsplash.com/premium_photo-1720692882719-2b10269d5dae?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        11,
        'Smoothie Mangue-Passion (500ml)',
        'Smoothie exotique mangue et fruit de la passion. Onctueux et parfumé, un vrai voyage gustatif.',
        7.490000000000000213,
        'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400'
    );
INSERT INTO Product
VALUES(
        12,
        'Jus de Tomate Bio (1L)',
        'Jus de tomate bio français, riche en lycopène. Parfait pour les cocktails ou à déguster nature avec du sel de Guérande.',
        3.790000000000000035,
        'https://plus.unsplash.com/premium_photo-1713996366466-6de3b6e357e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        13,
        'Jus de Cranberry (500ml)',
        'Jus de cranberry pur du Canada, légèrement acidulé. Excellent pour la santé urinaire et riche en antioxydants.',
        5.290000000000000035,
        'https://plus.unsplash.com/premium_photo-1663840820025-110ceadc4e60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
INSERT INTO Product
VALUES(
        14,
        'Smoothie Fruits Rouges (400ml)',
        'Mélange de fraises, framboises, myrtilles et mûres. Explosion de saveurs et de vitamines dans chaque gorgée.',
        6.490000000000000213,
        'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'
    );
INSERT INTO Product
VALUES(
        15,
        'Jus de Poire Williams (750ml)',
        'Jus de poire Williams du Val de Loire, doux et délicat. Pressé à froid pour préserver tous les arômes naturels.',
        4.990000000000000213,
        'https://www.cookomix.com/wp-content/uploads/2017/05/jus-de-poire-thermomix-800x600.jpg'
    );
INSERT INTO Product
VALUES(
        16,
        'Jus de Pêche Artisanal',
        'Pêches jaunes françaises pressées à froid, récoltées à parfaite maturité. Saveur sucrée et veloutée, sans additifs ni conservateurs. La douceur de l''été dans chaque gorgée.',
        7.200000000000000177,
        'https://img.cuisineaz.com/610x610/2016-04-28/i26500-jus-de-peche-frais.jpg'
    );
COMMIT;