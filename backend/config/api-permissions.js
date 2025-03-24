module.exports = ({ env }) => ({
  permissions: {
    'api::homepage.homepage': {
      actions: ['find', 'findOne'],
    },
    'api::property.property': {
      actions: ['find', 'findOne'],
    },
    'api::testimonial.testimonial': {
      actions: ['find', 'findOne'],
    },
    'api::service.service': {
      actions: ['find', 'findOne'],
    },
    'api::blog-post.blog-post': {
      actions: ['find', 'findOne'],
    },
  },
}); 