const togglePopup = () => {
    document.querySelectorAll(".marker-x")?.[1].click();
  };

  const openPopup = () => {
    if (document.querySelector(".popupcl")) {
      // popup is already open because the popup div exists
      // that div i.e. the popup, will be removed from dom by leaflet when we close the popup
      // already open so return
      return;
    }
    // I'm using shadow (see <Marker /> below) and react-leaflet assigns the className to both the marker and the shadow
    // Must use [0] or just document.querySelector(".marker-x") if not using shadow
    document.querySelectorAll(".marker-x")?.[1].click();
  };

  const [position, setPos] = useState(null);
  useEffect(() => {
    if (position !== null) openPopup();
  }, [position]);

    <Marker
      draggable={true}
      .....
      // Need to use this icon to specify a class to act as an identifier for the marker image
      icon={
        new Icon({
          iconUrl: iconURL,
         // NOTE: If this is not needed need to use document.querySelector('.marker-x') in openPopup
          shadowUrl: shadowURL,
          // Add a custom classname so we can query it
          className: "marker-x",
        })
      }
      position={position}
    >
      {/*  Using a custom classname here to query this as well  */}
      <Popup ... className="popupcl">
         ...
       </Popup>
     </Marker>
