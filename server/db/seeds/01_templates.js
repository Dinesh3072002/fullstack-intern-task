exports.seed = async function(knex) {
  await knex('favorites').del();
  await knex('templates').del();
  
  await knex('templates').insert([
    {
      id: 1, 
      name: 'SaaS Analytics Dashboard', 
      description: 'A comprehensive admin dashboard template for tracking SaaS metrics, revenue, and user activity with beautiful charts.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', 
      category: 'Dashboard'
    },
    {
      id: 2, 
      name: 'E-commerce Storefront', 
      description: 'Modern storefront template featuring product grids, shopping cart, and seamless checkout flow.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', 
      category: 'E-commerce'
    },
    {
      id: 3, 
      name: 'Creative Portfolio', 
      description: 'Minimalist portfolio template perfect for designers, photographers, and creative agencies to showcase their work.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600', 
      category: 'Portfolio'
    },
    {
      id: 4, 
      name: 'Marketing Landing Page', 
      description: 'High-converting landing page template optimized for lead generation and product launches.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600', 
      category: 'Landing Page'
    },
    {
      id: 5, 
      name: 'Corporate Blog', 
      description: 'Clean and readable blog template designed for content-heavy corporate websites and publications.', 
      thumbnail_url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600', 
      category: 'Blog'
    }
  ]);
};
