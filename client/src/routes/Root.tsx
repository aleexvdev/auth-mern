import { AnimatedOutlet } from '../components/AnimatedOutlet';

export const Root = () => {
  return (
    <>
      <div>
        <h1>Mi Aplicación</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
          </ul>
        </nav>
      </div>
      <AnimatedOutlet />
    </>
  );
}
