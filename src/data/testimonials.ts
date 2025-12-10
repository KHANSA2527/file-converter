export interface UserTestimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  testimonial: string
  imageUrl: string
}

export const testimonials: UserTestimonial[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'Marketing Manager',
    company: 'TechCorp Solutions',
    avatar: 'SM',
    rating: 5,
    testimonial: 'iLovePDF has saved me countless hours. The merge and split tools are incredibly intuitive and fast. Our team now processes documents 3x faster.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    name: 'David Thompson',
    role: 'Project Manager',
    company: 'Global Dynamics',
    avatar: 'DT',
    rating: 5,
    testimonial: 'The compression feature is a game-changer. My large reports are now much easier to share, and the quality remains excellent.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Consultant',
    company: 'Strategic Partners Inc',
    avatar: 'MR',
    rating: 5,
    testimonial: 'Easy to use, secure, and always available. The perfect PDF solution for my business needs. The watermark feature is fantastic for client documents.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Legal Advisor',
    company: 'Corporate Law Group',
    avatar: 'JW',
    rating: 5,
    testimonial: 'The security features give me confidence when handling sensitive documents. Password protection and digital signatures are essential for legal work.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '5',
    name: 'Emily Chen',
    role: 'Operations Director',
    company: 'LogiFlow Systems',
    avatar: 'EC',
    rating: 5,
    testimonial: 'Batch processing has revolutionized our workflow. We can process hundreds of documents simultaneously with consistent quality.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '6',
    name: 'Robert Kim',
    role: 'Freelance Designer',
    company: 'Creative Studio',
    avatar: 'RK',
    rating: 5,
    testimonial: 'As a designer, the quality preservation is crucial. iLovePDF maintains the visual integrity of my design documents perfectly.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
  }
]
