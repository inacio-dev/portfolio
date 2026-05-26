/**
 * Bibliografia da monografia — referências EFETIVAMENTE citadas no documento
 * final (extraídas via `\\citation` no `.aux` interseccionando com o
 * `.bib`). Demais entradas em `docs/tcc/monografia/3-pos-textuais/referencias.bib`
 * são sobra de pesquisa e ficam de fora.
 *
 * O título dos grupos é traduzido no JSON (`Thesis.referencesGroups.<group>`).
 * Texto das referências em si NÃO é traduzido — convenção acadêmica.
 */

export interface ThesisReference {
  author: string
  title: string
  /** Periódico, editora, instituição — opcional para TCCs sem editora */
  source?: string
  year: string
  /** Volume, número, páginas ou outro qualificador */
  extra?: string
  url?: string
}

export type ReferenceGroup =
  | 'book'
  | 'article'
  | 'proceedings'
  | 'undergrad'
  | 'graduate'
  | 'manual'
  | 'misc'

/**
 * `Partial<Record>` porque nem todos os tipos aparecem em toda monografia.
 * Atualmente não há dissertação de mestrado citada — `graduate` é `undefined`.
 */
export const THESIS_REFERENCES: Partial<Record<ReferenceGroup, readonly ThesisReference[]>> = {
  book: [
    {
      author: 'Gene F. Franklin and J. David Powell and Abbas Emami-Naeini',
      title: 'Sistemas de Controle para Engenharia',
      source: 'Bookman',
      year: '2013',
    },
    {
      author: 'Rafael C. Gonzalez, Richard E. Woods',
      title: 'Processamento Digital de Imagens',
      source: 'Pearson Prentice Hall',
      year: '2009',
    },
    {
      author: 'Ruggiero, Márcia A. Gomes and Lopes, Vera Lúcia da Rocha',
      title: 'Cálculo Numérico: Aspectos Teóricos e Computacionais',
      source: 'Makron Books/Pearson',
      year: '1996',
    },
  ],
  article: [
    {
      author: 'Kumari, Mona and Singh, Maheswari Prasad and Singh, Amit Kumar',
      title:
        'A latency sensitive and agile IIoT architecture with optimized edge node selection and task scheduling',
      source: 'Digital Communications and Networks',
      year: '2025',
    },
    {
      author:
        'Ito, Koki and Nakazato, Jin and Fontugne, Romain and Tsukada, Manabu and Hiroshi, Esaki',
      title:
        'A multipath redundancy communication framework for enhancing 5G mobile communication quality',
      source: 'Computer Communications',
      year: '2025',
    },
    {
      author: 'Ajayi, Oluwaseun Kayode and Du, Shengzhi and Nahri, Syeda Nadiah Fatima',
      title: 'A review of haptic technologies for hardware-in-the-loop development',
      source: 'Sensors and Actuators Reports',
      year: '2025',
    },
    {
      author: 'Khodamipour, Gholamreza and Khorashadizadeh, Saeed and Farshad, Mohsen',
      title:
        'Adaptive formation control of leader-follower mobile robots using reinforcement learning and the Fourier series expansion',
      source: 'ISA Transactions',
      year: '2023',
    },
    {
      author:
        'Deng, Zhen and Zhang, Shengzhan and Guo, Yuxin and Jiang, Hongqi and Zheng, Xiaochun and He, Bingwei',
      title:
        'Assisted teleoperation control of robotic endoscope with visual feedback for nasotracheal intubation',
      source: 'Robotics and Autonomous Systems',
      year: '2024',
    },
    {
      author: 'Li, Wenwen and Huang, Fanghao and Chen, Zihao and Chen, Zheng',
      title:
        'Automatic-switching-based teleoperation framework for mobile manipulator with asymmetrical mapping and force feedback',
      source: 'Mechatronics',
      year: '2024',
    },
    {
      author: 'Shukla, Ashish and Ross, Robert and Bhattacharya, Bishakh and Stumpf, Alex',
      title:
        'Autonomous water sampling and quality monitoring in remote locations: A novel approach using a remote-controlled boat',
      source: 'HardwareX',
      year: '2025',
    },
    {
      author: 'Manuel, Nelson Luis and Inanç, Nihat and Lüy, Murat',
      title:
        'Control and performance analyses of a DC motor using optimized PIDs and fuzzy logic controller',
      source: 'Results in Control and Optimization',
      year: '2023',
    },
    {
      author:
        'Ji, Qinglei and Jansson, Jakob and Sjöberg, Mikael and Wang, Xi Vincent and Wang, Lihui and Feng, Lei',
      title:
        'Design and calibration of 3D printed soft deformation sensors for soft actuator control',
      source: 'Mechatronics',
      year: '2023',
    },
    {
      author: 'Shaik, Zuber Basha and Peddakrishna, Samineni',
      title:
        'Design and implementation of electric vehicle with autonomous motion and steering control system using single board computer and sensors',
      source: 'Results in Engineering',
      year: '2025',
    },
    {
      author:
        'Bobrovsky, A. V. and Drobchenko, A. E. and Zotov, A. V. and Gorokhova, D. A. and Chizhatkina, E. D.',
      title:
        'Development of a Universal Module for Connecting Sensors to the CAN-bus for the Formula Student Electric Car',
      source: 'Transportation Research Procedia',
      year: '2023',
    },
    {
      author:
        'Shendge, Akshata and Singh, Rajendra and Ansari, Kashif I.B.H. and Pakhrani, Kishita',
      title: 'Development of an unmanned aerial vehicle for remote live streaming on web dashboard',
      source: 'Materials Today: Proceedings',
      year: '2023',
    },
    {
      author: 'An, Dohyun and Joo, Hyeontae and Kim, Hwangnam',
      title:
        'Enabling low-latency digital twins for large-scale UAV networks using MQTT-based communication framework',
      source: 'ICT Express',
      year: '2025',
    },
    {
      author: 'Dreger, Felix A. and Rinkenauer, Gerhard',
      title:
        'Evaluation of different feedback designs for target guidance in human controlled robotic cranes: A comparison between high and low performance groups',
      source: 'Applied Ergonomics',
      year: '2024',
    },
    {
      author: 'Santos, Vladimir Sousa and Eras, Juan J. Cabello and Ulloa, Mario J. Cabello',
      title:
        'Evaluation of the energy saving potential in electric motors applying a load-based voltage control method',
      source: 'Energy',
      year: '2024',
    },
    {
      author:
        'Rodríguez-Arellano, Jesús Abraham and Miranda-Colorado, Roger and Villafuerte-Segura, Raúl and Aguilar, Luis T.',
      title: 'Experimental observer-based delayed control of wheeled mobile robots',
      source: 'Applied Mathematical Modelling',
      year: '2025',
    },
    {
      author: 'Vashisht, Ankit and Gandhi, Geeta Chhabra and Kalra, Sumit and Saini, Dinesh Kumar',
      title:
        'Hybrid robot navigation: Integrating monocular depth estimation and visual odometry for efficient navigation on low-resource hardware',
      source: 'Computers and Electrical Engineering',
      year: '2025',
    },
    {
      author: 'Graf, Fabian and Watteyne, Thomas and Villnow, Michael',
      title: 'Monitoring performance metrics in low-power wireless systems',
      source: 'ICT Express',
      year: '2024',
    },
    {
      author:
        'Barón, Miguel and Diez, Luis and Zverev, Mihail and Juárez, José R. and Agüero, Ramón',
      title: 'On the performance of Zenoh in Industrial IoT Scenarios',
      source: 'Ad Hoc Networks',
      year: '2025',
    },
    {
      author:
        'Ayinla, Shehu Lukman and Amosa, Temitope Ibrahim and Ibrahim, Oladimeji and Rahman, Md. Siddikur and Bahashwan, Abdulrahman Abdullah and Mostafa, Mohammad Golam and Yusuf, Abdulrahman Olalekan',
      title: 'Optimal control of DC motor using leader-based Harris Hawks optimization algorithm',
      source: 'Franklin Open',
      year: '2024',
    },
    {
      author: 'Gökçe, Celal Onur and Ipek, Mahmut Esat and Dayıoğlu, Mehmet and Ünal, Rıdvan',
      title: 'Parameter estimation and speed control of real DC motor with low resolution encoder',
      source: 'Results in Control and Optimization',
      year: '2025',
    },
    {
      author: 'Chen, Sixun and Noguchi, Noboru',
      title:
        'Remote safety system for a robot tractor using a monocular camera and a YOLO-based method',
      source: 'Computers and Electronics in Agriculture',
      year: '2023',
    },
    {
      author: 'Huo, Faren and Wang, Tai and Fang, Fei and Sun, Cong',
      title:
        'The influence of tactile feedback in In-vehicle central control interfaces on driver emotions: A comparative study of touchscreens and physical buttons',
      source: 'International Journal of Industrial Ergonomics',
      year: '2024',
    },
    {
      author: 'Lu, Qiuyu and Li, June and Yuan, Kai and Liu, Kaipei and Ni, Ming and Luo, Jianbo',
      title: 'UDP-RT: A UDP-based reliable transmission scheme for power WAPS',
      source: 'Computer Networks',
      year: '2023',
    },
    {
      author:
        'Iqbal, Faheem and Gohar, Moneeb and Karamti, Hanen and Karamti, Walid and Koh, Seok-Joo and Choi, Jin-Ghoo',
      title: 'Use of QUIC for AMQP in IoT networks',
      source: 'Computer Networks',
      year: '2023',
    },
    {
      author: 'Xia, Pengxiang and You, Hengxu and Du, Jing',
      title: 'Visual-haptic feedback for ROV subsea navigation control',
      source: 'Automation in Construction',
      year: '2023',
    },
    {
      author:
        'AL-Dhief, Fahad Taha and Sabri, Naseer and Abdul Latiff, N. M. and Nik Abd. Malik, Nik Noordini and Albader, Musatafa Abbas Abbood and Mohammed, Mazin Abed and AL-Haddad, Rami Noori and Salman, Yasir Dawood and Abd Ghani, Mohd Khanapi and Obaid, Omar Ibrahim',
      title: 'Performance Comparison between TCP',
      source: 'International Journal of Engineering \\& Technology',
      year: '2018',
      extra: 'v.7, n.4.36, p.172--176',
    },
    {
      author:
        "Bekele, Bereket Endale and Tokarz, Krzysztof and Gebeyehu, Nebiyat Yilikal and Pochopie{\\'n",
      title: 'Performance Evaluation of UDP',
      source: 'Electronics',
      year: '2024',
      extra: 'v.13, n.18, p.3697',
    },
    {
      author:
        'Yang, Bo and Liu, Chao and Zhang, Lei and Teng, Long and Tian, Jiawei and Xu, Siyuan and Zheng, Wenfeng',
      title:
        'Novel Design of Three-Channel Bilateral Teleoperation with Communication Delay Using Wave Variable Compensators',
      source: 'Electronics',
      year: '2025',
      extra: 'v.14, n.13, p.2595',
    },
    {
      author: 'Ye, Yang and Zhou, Tianyu and Zhu, Qi and Vann, William and Du, Jing',
      title: 'Brain functional connectivity under teleoperation latency: a fNIRS',
      source: 'Frontiers in Neuroscience',
      year: '2024',
      extra: 'v.18, p.1416719',
    },
    {
      author:
        'Ji, Xunbi A. and Avedisov, Sergei S. and Khan, Mohammad Irfan and Vörös, Illés and Altintas, Onur and Orosz, Gábor',
      title:
        'On the effects of latency in teleoperated driving: stability and performance analysis',
      source: 'Vehicle System Dynamics',
      year: '2025',
    },
    {
      author: 'Chang, Yeong-Hwa and Yang, Cheng-Yuan and Lin, Hung-Wei',
      title:
        'Robust Adaptive-Sliding-Mode Control for Teleoperation Systems with Time-Varying Delays and Uncertainties',
      source: 'Robotics',
      year: '2024',
      extra: 'v.13, n.6, p.89',
    },
    {
      author:
        'Rafiei, Shirin and Singhal, Chetna and Brunnström, Kjell and Andersson, Jonas and Sjöström, Mårten',
      title: 'Laboratory study on quality of experience and user experience for teleoperation',
      source: 'Quality and User Experience',
      year: '2026',
      extra: 'v.11, n.1',
    },
  ],
  proceedings: [
    {
      author:
        'Heryana, Ana and Krisnandi, Dikdik and Pardede, Hilman F. and Nurkahfi, Galih Nugraha and Dinata, Mochamad Mardi Marta and Rozie, Andri Fachrur and Firmansyah, Rendra Dwi',
      title: 'Realtime Video Latency Reduction for Autonomous Vehicle Teleoperation Using RTMP',
      source:
        '2022 International Conference on Computer, Control, Informatics and Its Applications (IC3INA)',
      year: '2022',
    },
  ],
  undergrad: [
    {
      author: 'Machado, Gustavo Barbosa',
      title: 'Comparação de desempenho computacional de protocolos de comunicação para IoT',
      year: '2021',
      extra: ', p.38',
    },
    {
      author: 'Noronha Neto, Otávio',
      title: 'Explorando a jogabilidade em um jogo FPS',
      year: '2023',
    },
  ],
  manual: [
    {
      author: '{Infineon Technologies AG',
      title: 'BTS7960B -- High Current PN Half Bridge',
      year: '2013',
    },
    {
      author: '{Allegro MicroSystems',
      title:
        'ACS758 -- Thermally Enhanced, Fully Integrated, Hall-Effect-Based Linear Current Sensor IC',
      year: '2018',
    },
    {
      author: '{Bosch Sensortec',
      title: 'BMI160 -- Small, Low Power Inertial Measurement Unit',
      year: '2015',
    },
    {
      author: '{Maxim Integrated',
      title: 'DS18B20 -- Programmable Resolution 1-Wire Digital Thermometer',
      year: '2019',
    },
    {
      author: '{Texas Instruments',
      title: 'INA219 -- Zero-Drift, Bidirectional Current/Power Monitor with I2C Interface',
      year: '2015',
    },
    {
      author: '{NXP Semiconductors',
      title: 'PCA9685 -- 16-channel, 12-bit PWM Fm+ I2C-bus LED controller',
      year: '2015',
    },
    {
      author: '{XLSEMI',
      title: 'XL4015 -- 5A 180KHz 36V Buck DC to DC Converter',
      year: '2017',
    },
  ],
  misc: [
    {
      author: '{VelocityProjects3D',
      title: 'FV01 -- The Most Advanced 3D Printed RC Formula 1 Car',
      source: 'Printables',
      year: '2024',
    },
    {
      author: '{Autodesk',
      title: 'Tinkercad -- From mind to design in minutes',
      source: 'Software de modelagem 3D online',
      year: '2024',
    },
    {
      author: '{UltiMaker',
      title: 'UltiMaker Cura -- Trusted by millions of users worldwide',
      source: 'Software fatiador para impressão 3D',
      year: '2024',
    },
    {
      author: '{Logitech G',
      title: 'Volante de corrida Sim Logitech G923',
      source: 'Página oficial do produto',
      year: '2024',
    },
    {
      author: '{TP-Link',
      title: 'Roteador Mesh Wi-Fi',
      source: 'Página oficial do produto',
      year: '2024',
    },
    {
      author:
        'Belogolovy, Andrey and Dasalukunte, Deepak and Dorrance, Richard and Stupachenko, Evgeny and Zhang, Xue',
      title: 'Low latency communication over commercially available LTE',
      source: 'arXiv preprint arXiv:2209.09794',
      year: '2022',
    },
    {
      author:
        'Black, David Gregory and Tirindelli, Maria and Salcudean, Septimiu and Wein, Wolfgang and Esposito, Marco',
      title: 'Visual-Haptic Model Mediated Teleoperation for Remote Ultrasound',
      source: 'arXiv preprint arXiv:2502.07922',
      year: '2025',
    },
  ],
} as const
