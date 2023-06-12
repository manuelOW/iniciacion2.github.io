let imagenResultado;
    let estiloSeleccionado;
    let qrCode;

    async function procesarImagen() {
      // Obtener la imagen cargada
      const archivo = document.getElementById('imagen').files[0];
      if (!archivo) {
        alert('Por favor, seleccione una imagen para procesar.');
        return;
      }

      // Leer la imagen como objeto de tipo File
      const lector = new FileReader();
      lector.readAsDataURL(archivo);

      lector.onload = async () => {
        const imagenBase64 = lector.result.split(',')[1];

        // Obtener un estilo aleatorio
        const estilos = ["cubismo", "surrealismo", "art deco", "anime"];
        estiloSeleccionado = estilos[Math.floor(Math.random() * estilos.length)];

        // Hacer la solicitud a DeepAI Image API
        const formData = new FormData();
        formData.append("image", archivo);
        formData.append("text", new Blob([estiloSeleccionado], { type: "text/plain" }));

        const response = await fetch('https://api.deepai.org/api/image-editor', {
          method: 'POST',
          headers: {
            'api-key': 'fe10a5a6-bccd-410e-a138-c43f99b62ce5',
          },
          body: formData,
        });

        const data = await response.json();
        console.log(data);

        // Mostrar el resultado en la página web
        imagenResultado = new Image();
        imagenResultado.src = data.output_url;
        imagenResultado.onload = function() {
          document.getElementById('resultado').innerHTML = '';
          document.getElementById('resultado').appendChild(imagenResultado);
          
          // Mostrar botones para cada estilo posible
          const botonesEstilo = document.createElement('div');
          for (let i = 0; i < estilos.length; i++) {
            const boton = document.createElement('button');
            boton.innerHTML = estilos[i];
            boton.onclick = function() {
              verificarEstilo(i);
            };
            botonesEstilo.appendChild(boton);
          }
          document.getElementById('resultado').appendChild(botonesEstilo);
        };
      };
    }

    function verificarEstilo(estiloBoton) {
      const estilos = ["cubismo", "surrealismo", "art deco", "anime"];
      const estiloActual = estilos[estiloBoton];
      if (estiloActual === estiloSeleccionado) {
        alert("¡Has seleccionado el estilo correcto!");
        const qrCodeDiv = document.createElement('div');
        qrCodeDiv.id = 'qrCode';
        document.getElementById('resultado').appendChild(qrCodeDiv);
        qrCode = new QRCode(qrCodeDiv, {
          text: imagenResultado.src,
          width: 200,
          height: 200
        });
      } else {
        alert("El estilo seleccionado no coincide con el estilo de la imagen procesada.");
        if (qrCode) {
          qrCode.clear();
          const qrCodeDiv = document.getElementById('qrCode');
          if (qrCodeDiv) {
            qrCodeDiv.parentNode.removeChild(qrCodeDiv);
          }
        }
      }
    }
function verificarEstilo(estiloBoton) {
  // Resto del código

  if (estiloActual === estiloSeleccionado) {
    // Resto del código
    document.getElementById('resultado').classList.add('fireworks-animation');
  } else {
    // Resto del código
    document.getElementById('resultado').classList.remove('fireworks-animation');
  }
}
function iniciarAnimacionFuegosArtificiales() {
  particlesJS('resultado', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'image',
        image: {
          src: 'fireworks.png', // Reemplaza 'fireworks.png' con la ruta de tu imagen de fuegos artificiales
          width: 100,
          height: 100
        }
      },
      size: {
        value: 10,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse'
        },
        onclick: {
          enable: false,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}
