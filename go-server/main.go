package main

import (
	"bufio"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func main() {

	var debug bool
	var port int
	var host string
	var upstream string
	var data string
	var pvdata string
	var vdata string

	flag.StringVar(&host, "host", "0.0.0.0", "set the host value")
	flag.StringVar(&upstream, "upstream", "172.22.2.1", "set the upstream value")
	flag.IntVar(&port, "port", 10001, "set the port value")
	flag.BoolVar(&debug, "debug", false, "enable extra debug logging")

	flag.Parse()

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Type"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "OPTIONS"}
	config.ExposeHeaders = []string{"Content-Length"}
	r.Use(cors.New(config))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.GET("/deploy", func(c *gin.Context) {
		data = ""
		cmd := exec.Command("sshpass", "-p", "rvn", "ssh", "rvn@localhost", "sudo", "ansible-playbook", "")

		log.Infof("deploy called, running %s", cmd)
		stdout, err := cmd.StdoutPipe()
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"data": "pong",
			})
		}
		cmd.Start()

		scanner := bufio.NewScanner(stdout)
		scanner.Split(bufio.ScanWords)

		for scanner.Scan() {
			msg := scanner.Text()
			data = fmt.Sprintf("%s%s", data, msg)
			c.JSON(http.StatusOK, gin.H{
				"data": data,
			})
		}
		cmd.Wait()
		c.JSON(http.StatusOK, gin.H{
			"data": data,
		})
	})
	r.GET("/pv", func(c *gin.Context) {
		pvdata = ""
		cmd := exec.Command("sshpass", "-p", "rvn", "ssh", "rvn@localhost", "sudo", "ansible-playbook", "")
		log.Infof("pv called, running %s", cmd)

		stdout, err := cmd.StdoutPipe()
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"data": "pong",
			})
		}
		cmd.Start()

		scanner := bufio.NewScanner(stdout)
		scanner.Split(bufio.ScanWords)

		for scanner.Scan() {
			msg := scanner.Text()
			data = fmt.Sprintf("%s%s", pvdata, msg)
			c.JSON(http.StatusOK, gin.H{
				"data": pvdata,
			})
		}
		cmd.Wait()
		c.JSON(http.StatusOK, gin.H{
			"data": pvdata,
		})
	})
	r.GET("/validate", func(c *gin.Context) {
		vdata = ""
		cmd := exec.Command("sshpass", "-p", "rvn", "ssh", "rvn@localhost", "sudo", "ansible-playbook", "")
		log.Infof("validate called, running %s", cmd)

		stdout, err := cmd.StdoutPipe()
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"data": "pong",
			})
		}
		cmd.Start()

		scanner := bufio.NewScanner(stdout)
		scanner.Split(bufio.ScanWords)

		for scanner.Scan() {
			msg := scanner.Text()
			data = fmt.Sprintf("%s%s", vdata, msg)
			c.JSON(http.StatusOK, gin.H{
				"data": vdata,
			})
		}
		cmd.Wait()
		c.JSON(http.StatusOK, gin.H{
			"data": vdata,
		})
	})
	r.GET("/video", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	portStr := os.Getenv("PORT")
	if portStr != "" {
		portInt, err := strconv.Atoi(portStr)
		if err != nil {
			log.Warningf("Failed to convert MOCKPORT to int, ignored: %v", portStr)
		} else {
			port = portInt
		}
	}

	log.Infof("webpage port: %d\n", port)

	debugStr := os.Getenv("DEBUG")
	if debugStr != "" {
		debugInt, err := strconv.ParseBool(debugStr)
		if err != nil {
			log.Warningf("Failed to convert DEBUG to bool, ignored: %v", debugStr)
		} else {
			debug = debugInt
		}
	}

	streamStr := os.Getenv("UPSTREAM")
	if streamStr != "" {
		upstream = streamStr
	}

	if debug {
		log.SetLevel(log.DebugLevel)
		gin.SetMode(gin.DebugMode)
	} else {
		log.SetLevel(log.InfoLevel)
		gin.SetMode(gin.ReleaseMode)
	}

	mockAddr := fmt.Sprintf("%s:%d", host, port)
	log.Infof("starting webpage wrapper on: %s\n", mockAddr)

	r.Run(mockAddr)
}
