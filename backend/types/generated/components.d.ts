import type { Schema, Struct } from '@strapi/strapi';

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    description: 'A team member component';
    displayName: 'Team Member';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsStat extends Struct.ComponentSchema {
  collectionName: 'components_components_stats';
  info: {
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface ComponentsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_components_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    content: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface ContactSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_contact_social_links';
  info: {
    description: 'A social media link component';
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServicesService extends Struct.ComponentSchema {
  collectionName: 'components_services_services';
  info: {
    description: '';
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SpecificationsSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_specifications_specifications';
  info: {
    description: 'Sp\u00E9cifications techniques du bien';
    displayName: 'Specifications';
  };
  attributes: {
    anneeConstruction: Schema.Attribute.String;
    chambres: Schema.Attribute.String;
    etage: Schema.Attribute.String;
    orientation: Schema.Attribute.String;
    parking: Schema.Attribute.String;
    sallesDeBain: Schema.Attribute.String;
    surface: Schema.Attribute.String;
    terrain: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.team-member': AboutTeamMember;
      'components.stat': ComponentsStat;
      'components.testimonial': ComponentsTestimonial;
      'contact.social-link': ContactSocialLink;
      'services.service': ServicesService;
      'specifications.specifications': SpecificationsSpecifications;
    }
  }
}
