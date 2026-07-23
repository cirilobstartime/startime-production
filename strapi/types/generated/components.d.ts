import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_studies';
  info: {
    displayName: 'project';
  };
  attributes: {
    Details: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Text;
    project_name: Schema.Attribute.String;
    shortDescription: Schema.Attribute.String;
  };
}

export interface SharedEmployee extends Struct.ComponentSchema {
  collectionName: 'components_shared_employees';
  info: {
    displayName: 'employee';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'image';
  };
  attributes: {};
}

export interface SharedJoinUsTeamwrokBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_join_us_teamwrok_banners';
  info: {
    displayName: 'join_us_teamwrok_banner';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    job_title: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedReason extends Struct.ComponentSchema {
  collectionName: 'components_shared_reasons';
  info: {
    displayName: 'Reason';
  };
  attributes: {
    shortDescription: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedSharedTitleDescription extends Struct.ComponentSchema {
  collectionName: 'components_shared_shared_title_descriptions';
  info: {
    displayName: 'Shared_Title_Description';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSoluationNumDesc extends Struct.ComponentSchema {
  collectionName: 'components_shared_soluation_num_descs';
  info: {
    displayName: 'soluation_num_desc';
  };
  attributes: {
    description: Schema.Attribute.String;
    num: Schema.Attribute.String;
  };
}

export interface SharedSolution extends Struct.ComponentSchema {
  collectionName: 'components_shared_solutions';
  info: {
    displayName: 'solution';
  };
  attributes: {
    bullet: Schema.Attribute.Component<'shared.text-item', true>;
    soulationName: Schema.Attribute.String;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'Text Item';
  };
  attributes: {
    text_elment: Schema.Attribute.String;
  };
}

export interface SharedTimeline extends Struct.ComponentSchema {
  collectionName: 'components_shared_timelines';
  info: {
    displayName: 'timeline';
  };
  attributes: {
    shortDescription: Schema.Attribute.String;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface SharedValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'value';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.case-study': SharedCaseStudy;
      'shared.employee': SharedEmployee;
      'shared.image': SharedImage;
      'shared.join-us-teamwrok-banner': SharedJoinUsTeamwrokBanner;
      'shared.reason': SharedReason;
      'shared.shared-title-description': SharedSharedTitleDescription;
      'shared.soluation-num-desc': SharedSoluationNumDesc;
      'shared.solution': SharedSolution;
      'shared.text-item': SharedTextItem;
      'shared.timeline': SharedTimeline;
      'shared.value': SharedValue;
    }
  }
}
