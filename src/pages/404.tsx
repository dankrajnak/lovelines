import { Result, Button } from "antd";
import CenterLayout from "../Layout/CenterLayout";
import Div100vh from "react-div-100vh";
import Colors from "../Styles/colors";
import Link from "next/link";

const FourOhFour = () => (
  <Div100vh>
    <CenterLayout>
      <Result
        title="404"
        status="404"
        // icon={
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 22 22"
        //     height="200px"
        //     style={{ marginLeft: 7 }}
        //   >
        //     <defs id="defs3051"></defs>
        //     <path
        //       style={{ fill: Colors.white }}
        //       d="M 10.96875 3 C 9.21782 3 7.56187 3.4216019 6 4.2636719 L 6.7773438 6.0507812 C 7.5582637 5.6672613 8.2600456 5.3933025 8.8847656 5.2265625 C 9.5177356 5.0598325 10.162692 4.9765625 10.820312 4.9765625 C 11.806753 4.9765625 12.563734 5.1968119 13.089844 5.6386719 C 13.615944 6.0805419 13.878906 6.7136725 13.878906 7.5390625 C 13.878906 7.9809325 13.822111 8.369625 13.707031 8.703125 C 13.591951 9.036605 13.394724 9.369635 13.115234 9.703125 C 12.835754 10.036615 12.247563 10.586476 11.351562 11.353516 C 10.251483 12.356846 9.10046 14.139 9 16 L 11 16 L 10.994141 15.96875 C 10.994141 15.21007 11.125612 14.601138 11.388672 14.142578 C 11.659952 13.675688 12.201805 13.087576 13.015625 12.378906 C 14.010295 11.536836 14.673153 10.903726 15.001953 10.478516 C 15.338993 10.053316 15.589506 9.6041363 15.753906 9.1289062 C 15.918406 8.6536762 16 8.1071944 16 7.4902344 C 16 6.0728944 15.55227 4.97119 14.65625 4.1875 C 13.76024 3.39546 12.53061 3 10.96875 3 z M 9 17 L 9 19 L 11 19 L 11 17 L 9 17 z "
        //       className="ColorScheme-Text"
        //     ></path>
        //   </svg>
        // }
        subTitle="Either you made a mistake or we did."
        extra={
          <Button type="primary" ghost>
            <Link href="/">
              <a>Back Home</a>
            </Link>
          </Button>
        }
      />
      <style jsx global>
        {`
          body {
            background: ${Colors.red};
          }
          * {
            color: ${Colors.white} !important;
          }
        `}
      </style>
    </CenterLayout>
  </Div100vh>
);

export default FourOhFour;
