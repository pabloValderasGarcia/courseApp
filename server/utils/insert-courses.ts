import { CourseModel } from '../models/course-model';

// Insert courses
export const insertCourses = async () => {
  // Check if courses already exist
  const existingCourse = await CourseModel.findOne();
  if (existingCourse) return;

  // Define courses
  const courses = [
    {
      title: 'Introducción a la Programación',
      description: 'Aprende los fundamentos de la programación con Python.',
      imageUrl: 'https://media.istockphoto.com/id/1481370371/es/foto/retrato-de-una-entusiasta-joven-hispana-trabajando-en-una-computadora-en-una-oficina-moderna-y.jpg?s=612x612&w=0&k=20&c=N2yuu5bjZ0Tw6VOtMydJGGwqtbnYVW3Dfkk-XbvzTeo=',
    },
    {
      title: 'Diseño Gráfico con Photoshop',
      description: 'Domina las herramientas esenciales de Photoshop para crear diseños impactantes.',
      imageUrl: 'https://www.openaccessgovernment.org/wp-content/uploads/2019/03/dreamstime_s_115214614.jpg',
    },
    {
      title: 'Desarrollo Web con React',
      description: 'Aprende a crear aplicaciones web modernas usando React.',
      imageUrl: 'https://winnipeg.ctvnews.ca/content/dam/ctvnews/en/images/2020/11/12/work-from-home-1-5186089-1627385675007.jpg',
    },
    {
      title: 'Fotografía Digital Avanzada',
      description: 'Perfecciona tus habilidades fotográficas y aprende técnicas profesionales.',
      imageUrl: 'https://img.freepik.com/free-photo/young-dark-haired-man-is-working-table-office-he-wears-blue-shirt-with-black-jacket-he-is-typing-laptop-looks-busy_197531-518.jpg',
    },
    {
      title: 'Gestión de Proyectos Ágiles',
      description: 'Aprende a gestionar proyectos de manera eficiente con metodologías ágiles.',
      imageUrl: 'https://bondc.com.au/wp-content/uploads/2023/07/benefits-of-working-from-home-1024x512.jpg',
    },
    {
      title: 'Introducción al Diseño UX/UI',
      description: 'Comprende los principios del diseño centrado en el usuario.',
      imageUrl: 'https://media.istockphoto.com/id/1347652268/es/foto/grupo-de-colegas-celebrando-el-%C3%A9xito.jpg?s=612x612&w=0&k=20&c=jfKzoa5C2sTvt6HiX3KcxufKGttcIrfhvxm_tWHt2GQ=',
    },
    {
      title: 'Marketing Digital para Principiantes',
      description: 'Descubre las estrategias de marketing digital más efectivas.',
      imageUrl: 'https://www.cv-library.co.uk/career-advice/wp-content/uploads/2018/06/What-is-it-like-working-in-IT-e1651761435165.jpg',
    },
    {
      title: 'Desarrollo de Aplicaciones Móviles',
      description: 'Aprende a desarrollar aplicaciones móviles para Android e iOS.',
      imageUrl: 'https://libertystreeteconomics.newyorkfed.org/wp-content/uploads/sites/2/2023/06/LSE_2023_working-remotely_emanuel_460.jpg',
    },
    {
      title: 'Ciberseguridad Básica',
      description: 'Protege tus dispositivos y datos en línea con los mejores principios de seguridad.',
      imageUrl: 'https://media.istockphoto.com/id/1435220822/es/foto/desarrollador-de-software-afroamericano.jpg?s=612x612&w=0&k=20&c=B8yReNE6ryKa1aUVQOun0D3qH_0dg9YE2rN1RBJcmM4=',
    },
  ];

  // Insert courses
  for (const courseData of courses) {
    const course = new CourseModel({
      title: courseData.title,
      description: courseData.description,
      imageUrl: courseData.imageUrl,
    });
    await course.save();
  }
}